# Sub

[![CI](https://github.com/submarine-kr/sub/actions/workflows/ci.yml/badge.svg)](https://github.com/submarine-kr/sub/actions/workflows/ci.yml)
[![Playwright Tests](https://github.com/younginch/sub/actions/workflows/playwright.yml/badge.svg)](https://github.com/younginch/sub/actions/workflows/playwright.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/07199be51bc066ba061f/maintainability)](https://codeclimate.com/repos/62a0a015e9eec62ffd00714b/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/07199be51bc066ba061f/test_coverage)](https://codeclimate.com/repos/62a0a015e9eec62ffd00714b/test_coverage)
[![codecov](https://codecov.io/gh/younginch/sub/branch/main/graph/badge.svg?token=ET2YVQ4FTC)](https://codecov.io/gh/younginch/sub)

## Getting Started

### Install Dependency

Node 14

```bash
npm i
```

### Database

```bash
psql -U sboh -d postgres
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

### Troubleshoting
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

## Deploy on Vercel

### env
Fill out environment variables listed on .env with production settings.
