import { Card } from "react-bootstrap";
import LogoutButton from "./LogoutButton";

type ProfileData = {
  id: string;
  display_name: string;
  email: string;
  profile_photo: string;
};

type ProfileProps = {
  user: ProfileData;
};

const Profile = ({ user }: ProfileProps) => {
  return (
    <Card className="shadow-sm" style={{ width: "24rem" }}>
      <Card.Body>
        <p>{user.id}</p>
        <p>{user.display_name}</p>
        <p>{user.email}</p>
        <img src={user.profile_photo} alt={user.display_name} />
      </Card.Body>
      <LogoutButton />
    </Card>
  );
};

export default Profile;
