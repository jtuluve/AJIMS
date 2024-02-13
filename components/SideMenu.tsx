

export default function SideMenu(){
  return(
  <>
    <div className="divisions">
					<div className="box">
						<img src="/user.png" />
						<a href="/appraisal">Faculty appraisal</a>
					</div>
					<div className="box">
						<img src="/leave.png" />
						<a href="/comingsoon">Apply Leave</a>
					</div>
					<div className="box">
						<img src="/tax.png" />
						<a href="/comingsoon">Tax Planning</a>
					</div>
					<div className="box">
						<img src="/paySlip.png" />
						<a href="/comingsoon">Pay Slip</a>
					</div>
					<div className="box">
						<img src="/insurance.png" />
						<a href="/faculty-details">Faculty Details</a>
					</div>

				</div>
  </>
  )
}