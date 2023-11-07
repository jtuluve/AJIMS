import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import sqlite3 from 'sqlite3';
import { NextApiRequest } from "next";



const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name:"Sign In",
      type: "credentials",
      credentials: {},
      async authorize(credentials, req: NextApiRequest): Promise<any> {
        const { id, password } = credentials as {
          id: string;
          password: string;
        };
      
        return new Promise((resolve, reject) => {
          const db = new sqlite3.Database('users.sqlite', async (err) => {
            if (err) {
              console.error(err.message);
              reject("Database Error");
            }
      
            const sql = 'SELECT * FROM users WHERE id = ? AND password = ?';
            db.get(sql, [id, password], (err, row: any) => {
              if (err) {
                console.error(err.message);
                reject("Database Error");
              }
      
              if (row) {
                // User credentials are valid
                // You can generate a JWT token here and return it to the client for authentication
                const ret = {
                  id: row.id,
                  name: "John",
                };
                resolve(ret);
              } else {
                // User credentials are not valid
                reject("Invalid id or password");
              }
      
              // Close the database connection
              db.close((err) => {
                if (err) {
                  console.error(err.message);
                  reject("Database Error");
                }
              });
            });
          });
        });
      }
      ,
      }),
  ],
  pages: {
    signIn: "/",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {
    jwt(params:any) {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      // return final_token
      return params.token;
    },
  },
};
const handler = NextAuth(authOptions)

async function isValid(id:string,password:string){
  
}

export { handler as GET, handler as POST };