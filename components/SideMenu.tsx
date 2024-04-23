

export default function SideMenu(){
  return(
  <>
    <div className="divisions">
					<div className="box">
						<img alt="user" src="/user.png" />
						<a href="/faculty-details">Faculty Details</a>
					</div>
					<div className="box">
						<img alt="appraisal" src="/appraisal.png" />
						<a href="/appraisal">Faculty appraisal</a>
					</div>
					<div className="box">
						<img alt="leave" src="/leave.png" />
						<a href="/applyleave">Apply Leave</a>
					</div>
					<div className="box">
						<img alt="tax" src="/tax.png" />
						<a href="/taxplanning">Tax Planning</a>
					</div>
					<div className="box">
						<img alt="payslip" src="/paySlip.png" />
						<a href="/payslip">Pay Slip</a>
					</div>

				</div>
  </>
  )
}