export default function ({ store, redirect, route, $cookies }) {
  try{
    // List of routes that don't require authentication
    const publicRoutes = ['/register'];

    if (!publicRoutes.includes(route.path) && (!$cookies.get('user') || !$cookies.get('user').id)) {
      return redirect('/login');
    }
  }catch(err){
    console.log("err", err)
  }
}
