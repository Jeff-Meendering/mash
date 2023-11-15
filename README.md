# MASH
**Meet and Study Here (MASH)** is a platform that allows individuals to find study partners.

## Prerequisites
- Node.js v20.x or higher
- npm v10.x or higher

## Install
1. Clone the application and navigate into its directory:
```bash
git clone https://github.com/Jeff-Meendering/mash.git
cd mash
```

2. Create an .env file in the root of your project directory. Add your PlanetScale database and Clerk user authentication credentials to the file...
```
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```
***Important: Never commit your .env file to public repositories. Keep your credentials secure.***

4. Install the required packages:...
```
npm install
```

5. Run the application...
```
npm run dev
```