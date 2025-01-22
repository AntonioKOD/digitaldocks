interface ProfilePageProps {
  params: Promise<{ id: string }>; // Adjusted to match the expected type
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params; // Await the params to extract 'id'

  if (!id) {
    return <p>Error: No ID provided</p>;
  }

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