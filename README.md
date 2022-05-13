# Sub

[![CI](https://github.com/submarine-kr/sub/actions/workflows/ci.yml/badge.svg)](https://github.com/submarine-kr/sub/actions/workflows/ci.yml)
[![Playwright Tests](https://github.com/younginch/sub/actions/workflows/playwright.yml/badge.svg)](https://github.com/younginch/sub/actions/workflows/playwright.yml)
[![codecov](https://codecov.io/gh/younginch/sub/branch/main/graph/badge.svg?token=ET2YVQ4FTC)](https://codecov.io/gh/younginch/sub)

## Getting Started

### Install Dependency

Node 14

```bash
npm i
```

### Database

```bash
psql -U postgres
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

## Deploy on Vercel

### env
Fill out environment variables listed on .env with production settings.
