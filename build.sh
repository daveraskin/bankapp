#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Creating a virtual env for both poetry and our packages..."
python -m venv venv

echo "Updating pip ;-)..."
./venv/bin/python -m pip install --upgrade pip

echo "Installing new/better version of poetry into our virtual env..."
./venv/bin/pip install poetry==1.6.1

echo "Installing our (non-dev) packages..."
cd /opt/render/project/src
./venv/bin/poetry install

./venv/bin/poetry run python manage.py collectstatic --no-input
./venv/bin/poetry run python manage.py migrate