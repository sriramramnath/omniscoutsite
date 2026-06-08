#!/usr/bin/env bash
# OmniScout installer — https://omniscout.xyz/install.sh
#
# Usage:
#   curl -fsSL https://omniscout.xyz/install.sh | bash
#
# Optional env:
#   OMNISCOUT_VERSION=0.2.7.1   pin a PyPI release
#   OMNISCOUT_PIP=pip3          override pip executable
set -euo pipefail

OMNISCOUT_VERSION="${OMNISCOUT_VERSION:-}"
INSTALL_URL="${OMNISCOUT_INSTALL_URL:-https://omniscout.xyz/install.sh}"

info() { printf '==> %s\n' "$*"; }
warn() { printf 'warning: %s\n' "$*" >&2; }
die() { printf 'error: %s\n' "$*" >&2; exit 1; }

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || die "missing required command: $1"
}

find_python() {
  local cmd version major minor
  for cmd in python3.13 python3.12 python3.11 python3; do
    if ! command -v "$cmd" >/dev/null 2>&1; then
      continue
    fi
    version="$("$cmd" -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')"
    major="${version%%.*}"
    minor="${version##*.}"
    if [ "$major" -eq 3 ] && [ "$minor" -ge 11 ]; then
      printf '%s\n' "$cmd"
      return 0
    fi
  done
  return 1
}

ensure_pip() {
  local py="$1"
  if "$py" -m pip --version >/dev/null 2>&1; then
    return 0
  fi
  info "Bootstrapping pip for $py"
  "$py" -m ensurepip --upgrade >/dev/null 2>&1 || true
  "$py" -m pip --version >/dev/null 2>&1 || die "pip is required; install pip for $py first"
}

install_omniscout() {
  local py="$1"
  local spec="omniscout"
  if [ -n "$OMNISCOUT_VERSION" ]; then
    spec="omniscout==${OMNISCOUT_VERSION}"
  fi
  info "Installing ${spec} (this may take a minute)"
  if [ -n "${OMNISCOUT_PIP:-}" ]; then
    "${OMNISCOUT_PIP}" install --upgrade "$spec"
  else
    "$py" -m pip install --upgrade "$spec"
  fi
}

run_omniscout_setup() {
  local py="$1"
  info "Running omniscout install (browser + models + agent skill)"
  # stdin is not a tty when piped from curl; CLI picks the first installed browser.
  "$py" -m omniscout install --skill </dev/null
}

main() {
  if [ -z "${BASH_VERSION:-}" ]; then
    die "run with bash: curl -fsSL ${INSTALL_URL} | bash"
  fi

  need_cmd curl

  local py
  py="$(find_python)" || die "Python 3.11+ is required (https://docs.omniscout.xyz/cli/overview/)"
  info "Using $(command -v "$py") ($("$py" --version 2>&1))"

  ensure_pip "$py"
  install_omniscout "$py"

  if ! "$py" -m omniscout --version >/dev/null 2>&1; then
    die "omniscout installed but is not importable; ensure scripts are on PATH"
  fi

  run_omniscout_setup "$py"

  info "Done. Try: omniscout search \"local-first browser agents\""
  info "Docs: https://docs.omniscout.xyz"
}

main "$@"
