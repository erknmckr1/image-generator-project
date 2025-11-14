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
  const { credits_remaining } = useSelector((state: RootState) => state.credit);
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
           {/* HEADER */}
        <div className="px-4 py-3 bg-muted/30 border-b">
          <p className="text-sm font-semibold text-foreground">
            {user_metadata?.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {user_metadata?.email || ""}
          </p>

          <p className="text-xs mt-1 font-medium">
            ⭐ Credits: <span className="text-primary">{credits_remaining}</span>
          </p>
        </div>

        {/* MENU */}
        <div className="flex flex-col py-2 text-sm">
          <Link
            className="px-4 py-2 hover:bg-muted hover:underline hover:underline-offset-4 transition"
            href="/account"
          >
            Account Settings
          </Link>

          <Link
            className="px-4 py-2 hover:bg-muted hover:underline hover:underline-offset-4 transition"
            href="/account/billing"
          >
           Billing & Credits
          </Link>

          <Link
            className="px-4 py-2 hover:bg-muted hover:underline hover:underline-offset-4 transition-all"
            href="/dashboard/my-images"
          >
             My Images
          </Link>
        </div>
          <Button onClick={handleLogout} className="w-full text-sm">
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
