# Sub

[![CI](https://github.com/submarine-kr/sub/actions/workflows/ci.yml/badge.svg)](https://github.com/submarine-kr/sub/actions/workflows/ci.yml)

## Getting Started

Node 14

```bash
psql -U postgres
CREATE USER sub PASSWORD 'password' SUPERUSER;
CREATE DATABASE dev OWNER sub;
exit
npx prisma generate
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

### env
- DATABASE_URL
- NEXTAUTH_SECRET
