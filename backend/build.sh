#!/bin/sh

go generate ./...
swag init
air
