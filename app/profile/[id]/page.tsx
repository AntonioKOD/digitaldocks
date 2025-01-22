interface ProfilePageProps {
    params: { id: string }; // Ensure `id` is required (not optional)
  }
  
  export default async function ProfilePage({ params }: ProfilePageProps) {
    // ✅ Destructure `id` properly
    const { id } =  await params;
  
    if (!id) {
      return <p>Error: No ID provided</p>;
    }
  
    // ✅ Use an absolute URL to prevent "Invalid URL" errors
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${id}`);
  
    if (!res.ok) {
      return <p>Profile not found</p>;
    }
  
    const profile = await res.json();
  
    return (
      <div>
        <h1>{profile.user.name}&apos;s Profile</h1>
        <p>Email: {profile.email}</p>
        <p>Bio: {profile.bio}</p>
      </div>
    );
  }