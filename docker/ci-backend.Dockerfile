FROM ubuntu:22.04
WORKDIR /app
COPY myapp /app
COPY config.yaml /app/config/config.yaml

ENTRYPOINT ["./myapp"]
