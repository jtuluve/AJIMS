import Link from "next/link";


export default function SideMenu(){
	
  return(
  <>
    <div className="divisions">
		<div className="box">
			<img alt="user" src="/user.png" />
			<Link href="/faculty-details">Faculty Details</Link>
		</div>

		<div className="box">
			<img alt="appraisal" src="/appraisal.png" />
			<Link href="/appraisal">Faculty appraisal</Link>
		</div>

		<div className="box">
			<img alt="leave" src="/leave.png" />
			<Link href="/applyleave">Apply Leave</Link>
		</div>

		<div className="box">
			<img alt="tax" src="/tax.png" />
			<Link href="/taxplanning">Tax Planning</Link>
		</div>

		<div className="box">
			<img alt="payslip" src="/paySlip.png" />
			<Link href="/payslip">Pay Slip</Link>
		</div>
	</div>
  </>
  )
}