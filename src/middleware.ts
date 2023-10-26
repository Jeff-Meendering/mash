import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
 
export default authMiddleware({
      afterAuth(auth, req, evt) {
        // handle users who aren't authenticated
        if (!auth.userId && !auth.isPublicRoute) {
          return redirectToSignIn({ returnBackUrl: '/sign_in_page' });
        }
      }
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};