import Card from "@/components/Card";
import LandingPage from "@/components/landing-page";

const page = () => {
  return (
    <div className="  gap-10" >
      <LandingPage />
      <Card/>
      <Card/>
      <Card/>
    </div>
  );
};

export default page;
