export async function getFirebaseAuth(){
  const res = await fetch("/api/firebase/getauth",{method:"GET"});
  if(res.status==401) return null;
  return await res.json() as {auth,app}
}