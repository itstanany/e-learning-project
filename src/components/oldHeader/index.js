// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useCallback, useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import { auth } from '../../firebase';

// function Header() {
//   const router = useRouter();
//   const handleSignout = useCallback(async (e) => {
//     e.preventDefault();
//     await fetch('/api/logout');
//     await auth.signOut();
//     // router.reload();
//   }, [router]);
//   // const { user } = useUser();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     console.log({ pathname: router.asPath });
//     const unsubscribeAuthStateChange = auth.onAuthStateChanged((authUser) => {
//       if (authUser) {
//         console.log({ authUser });
//         setUser(authUser);
//       } else {
//         setUser(authUser);
//       }
//     });
//     return () => unsubscribeAuthStateChange();
//   }, []);

//   useEffect(() => {
//     console.log({ router: { ...router } });
//   }, [router]);

//   return (
//     // if you want to hide the header in authentication page
//     // router.pathname === '/auth'
//     // ? null
//     // : (
//     <div>
//       Header placeholder
//       {
//         user
//           ? (
//             <button type="button" onClick={handleSignout}>
//               Sign Out
//             </button>
//           )
//           : (
//             <Link
//               href={
//                 {
//                   pathname: '/auth',
//                   query: { from: `${router.asPath}` },
//                 }
//               }
//             >
//               {/*
//                     * protection to disable the "signin" anchor tag and escape it..
//                     * from assistive technology when the user in "authentication" page
//                     * as it causes problem in "from" url query parameter like infinite loop.
//                   */}
//               <a
//                 disabled={router.pathname === '/auth' ? true : undefined}
//                 tabinex={router.pathname === '/auth' ? -1 : 0}
//               >
//                 Sign in
//               </a>
//             </Link>
//           )
//       }
//     </div>
//     // )
//   );
// }

// export { Header };
