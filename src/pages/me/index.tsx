import { AuthenticatedLayout, PagePadding } from "@/layouts";
import { LoggedIn } from "@/features/authentication";
import { UpdateUser } from "@/features/users";
import { UserActiveSubscriptionItemList } from "@/features/subscriptions";
import Link from "next/link";
import { Button } from "@/components/button";

export default function Page() {
  return (
    <LoggedIn>
      {(userId) => (
        <AuthenticatedLayout
          userId={userId}
          selectedCompanyId={null}
          companyTab={null}
        >
          <PagePadding>
            <div className="w-full max-w-screen-tablet mx-auto flex flex-col gap-12">
              <div>
                <h2 className="text-xl font-semibold mb-2">Account</h2>
                <UpdateUser id={userId} />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Security</h2>
                <Button asChild variant="secondary">
                  <Link href="/auth/change-password">Change password</Link>
                </Button>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Subscription</h2>
                <UserActiveSubscriptionItemList id={userId} />
              </div>
            </div>
          </PagePadding>
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
