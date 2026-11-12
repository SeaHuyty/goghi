FROM golang:1.20-alpine AS builder

WORKDIR /app

COPY go.mod ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o post-service ./services/post-service/cmd/main.go

FROM alpine:latest

WORKDIR /root/

RUN apk --noo-cache add ca-certificates

COPY --from=builder /service/post-service .

EXPOSE 8081

CMD ["./post-service"]