# Sub

[![CI](https://github.com/submarine-kr/sub/actions/workflows/ci.yml/badge.svg)](https://github.com/submarine-kr/sub/actions/workflows/ci.yml)
[![Playwright Tests](https://github.com/younginch/sub/actions/workflows/playwright.yml/badge.svg)](https://github.com/younginch/sub/actions/workflows/playwright.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/07199be51bc066ba061f/maintainability)](https://codeclimate.com/repos/62a0a015e9eec62ffd00714b/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/07199be51bc066ba061f/test_coverage)](https://codeclimate.com/repos/62a0a015e9eec62ffd00714b/test_coverage)
[![codecov](https://codecov.io/gh/younginch/sub/branch/main/graph/badge.svg?token=ET2YVQ4FTC)](https://codecov.io/gh/younginch/sub)

## Getting Started

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

### Install Dependency

Node 14

```bash
npm i
```

### Database

```bash
psql -U <Username> -d postgres
CREATE USER sub PASSWORD 'password' SUPERUSER;
CREATE DATABASE dev OWNER sub;
exit
npx prisma generate
npx prisma db push
```

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Guide to develop

- postgresql 연결이 안될때

```bash
rm -f /usr/local/var/postgres/postmaster.pid
brew services restart postgresql && brew services list
```

- prisma 연결

```javascipt
//const prisma = new PrismaClient();
prisma
```

### Adding new models on DB

1. schema.prisma 에 model 추가
2. 자동 생성되는 relation을 `Withdraw` 에서 `withdraws` 와 같이 변경
3. pages/api/admin/delete 에 추가된 model 삭제 코드 추가
4. jest.setup.js에 mocking 추가
5. PR 머지 후 DB 변경 팀원에 알리기

## Deploy on Vercel

### env

Fill out environment variables listed on .env with production settings.
