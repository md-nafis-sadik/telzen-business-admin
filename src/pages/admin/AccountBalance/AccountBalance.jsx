import AccountBalanceCards from "@/components/accountBalance/AccountBalanceCards";
import AccountBalanceTable from "@/components/accountBalance/AccountBalanceTable";
import { useAccountBalance } from "@/hooks";

function AccountBalance() {
  return (
    <section className="w-full flex-1 flex flex-col overflow-auto rounded-2xl">
      <AccountBalanceCards />

      <AccountBalanceTable />
    </section>
  );
}

export default AccountBalance;
