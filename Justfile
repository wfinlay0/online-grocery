#vim: ft=make ts=4 sw=4 et
set dotenv-load := false

IMAGE_REGISTRY := 'registry.gitlab.com/lldev-team/grocery-simulation'
CACHEPATH := 'registry.gitlab.com/lldev-team/grocery-simulation/cache'

set shell := ["/bin/bash", "-c"]

list:
    just --list


@_offset:
    git describe --tags --long --match "v*" | cut -d"-" -f2

@current:
    git describe --tags --long --match "v*" | cut -d"-" -f1

@next:
    [[ $( just _offset ) -gt 0 ]] && \
        bumpversion --dry-run --list --current-version $( just current ) --allow-dirty patch | sed -nre '/^new/s/^.*=(.*)$/v\1/p' || \
        just current

# step=image layer, action=(--push|--load)
build step action='':
    #!/usr/bin/env bash
    set -xo pipefail
    echo "step={{ step }}"
    IMAGE_VERSION=$( just next )
    [[ "{{ step }}" == "release" ]] && cachebits="--cache-to=type=registry,ref={{CACHEPATH}},mode=max --cache-from=type=registry,ref={{CACHEPATH}}" && endbits=${IMAGE_VERSION} || endbits=${IMAGE_VERSION}-{{ step }}
    [[ "{{ step }}" != "release" ]] && cachebits="--cache-to=type=registry,ref={{CACHEPATH}}-{{ step }},mode=max --cache-from=type=registry,ref={{CACHEPATH}}-{{ step }}"
    GIT_BRANCH=$( git branch --show-current )
    [[ -z ${GIT_BRANCH} ]] && GIT_BRANCH=${CI_COMMIT_REF_NAME}

    docker buildx build ${cachebits} \
        -t {{IMAGE_REGISTRY}}:${endbits} \
        {{action}} \
        --build-arg=GIT_BRANCH=${GIT_BRANCH} \
        --build-arg=VERSION=${IMAGE_VERSION} \
        --target {{step}} .

tag:
    #!/usr/bin/env bash
    echo {{IMAGE_REGISTRY}}:$( just current )

@buildkit-up:
    #!/bin/bash
    set -o pipefail
    [[ -n $( docker buildx ls | grep 'default.*docker' ) ]] &&
        docker buildx create --platform linux/amd64 --bootstrap --name builder >& /dev/null
        docker buildx use builder

# take down buildkit runner & configure local docker for default builds
@buildkit-down:
    docker buildx use default
    docker buildx stop builder

run:
    @docker run -it --rm $( just tag ) /bin/sh
