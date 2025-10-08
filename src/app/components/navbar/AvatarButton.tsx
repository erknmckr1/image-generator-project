import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function AvatarButton() {
  const { user_metadata } = useSelector((state: RootState) => state.user);
  const supabase = createClient();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      location.href = "/login";
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="relative cursor-pointer rounded-full w-[40px] h-[40px] text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90">
          {user_metadata?.picture ? (
            <Image
              src={user_metadata.picture}
              alt="User Avatar"
              className="rounded-full w-full h-full "
              fill={true}
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
              {user_metadata?.name?.[0]?.toUpperCase() || "?"}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div className="flex flex-col space-y-2">
          <div className="text-sm font-medium text-foreground px-2">
            {user_metadata?.name || "User"}
          </div>
          <span className="text-sm text-foreground px-2 hover:underline-offset-3 hover:underline">
            <Link href={"/dashboard/account"}>Account</Link>
          </span>
          <Button onClick={handleLogout} className="w-full text-sm">
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
