// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserProfile = ({params} : {params : any}) => {
  return (
    <div className="text-center text-4xl mt-8 text-black">
      <h1 >User Profile Page</h1>
      <h2>User ID:  {"   "+params.id}</h2>
    </div>
  )
}

export default UserProfile
