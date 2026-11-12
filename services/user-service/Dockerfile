FROM golang:1.20-alpine AS builder

WORKDIR /app

COPY go.mod ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o user-service ./services/user-service/cmd/main.go

FROM alpine:latest

WORKDIR /root/

RUN apk --noo-cache add ca-certificates

COPY --from=builder /service/user-service .

EXPOSE 8082

CMD ["./user-service"]