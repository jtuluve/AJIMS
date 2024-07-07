"use client";

import { useState, useEffect, useRef } from "react";
import { useAdminData } from "@/components/adminContext";
import '@css/print[uid].css'
import { UserDocument } from "@/lib/mongoose/interface";

const PrintDetails = ({ params }) => {

    const { uid } = params;
    const { allUsers } = useAdminData();
    const [user, setUser] = useState<UserDocument | null>(null);

    const internationalCount = user?.appraisal?.research?.publications?.filter(
        (publication: any) => publication.category === 'International'
    ).length;

    const nationalCount = user?.appraisal?.research?.publications?.filter(
        (publication: any) => publication.category === 'National'
    ).length;

    const stateInstitutionalCount = user?.appraisal?.research?.publications?.filter(
        (publication: any) => publication.category === 'State/Institutional'
    ).length;

    const booksPublished = user?.appraisal?.research?.books?.length || 0;
    let totalChapters = 0;
    user?.appraisal?.research?.books?.forEach((book: any) => {
        totalChapters += book.chapters?.length || 0;
    });

    useEffect(() => {
        if (allUsers.length > 0) {
            const fetchedUser = allUsers.find((unitUser) => unitUser.uid === uid);
            setUser(fetchedUser);
        }
    }, [allUsers, uid]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-container">
            <div className="page1">
                <center><h1>Faculty/ SR/ Tutor/ Demonstrator Declaration Form</h1></center>
                <p><strong>Name of the college:</strong> {user?.profile?.collegeN}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Submission date:</th>
                            <td>_ _ / _ _ / _ _ _ _</td>
                        </tr>
                    </thead>
                </table>
                <div className="smalltext">
                    <p>
                        <strong>Note:</strong> It is the responsibility of the Dean to ensure that the submitted Declaration form is ONLY of a Faculty member who is working as a full-time employee of the college
                    </p>
                </div>
                <div className="faculty-details">
                    <div className="details">
                        <p><strong>1. Name of Faculty:</strong> {user?.profile?.name}</p>
                        <p><strong>2. Age & Date of birth:</strong> {user?.profile?.age} years,  {user?.profile?.dob? user?.profile?.dob?.toString().slice(0, 10) : 'N/A'}</p>
                        <p><strong>3. Present Designation:</strong> {user?.profile?.designation}</p>
                        <div className="designation-section">
                            <p><strong>a. Appointment order:</strong> Certified copy of order at this institute attached: {user?.profile?.appointmentOrderStatus}</p>
                            <p><strong>b. Department:</strong> {user?.profile?.department}</p>
                            <p><strong>c. College/ Institute:</strong> {user?.profile?.instituteName}</p>
                            <p><strong>d. City/ District:</strong> {user?.profile?.cityName}</p>
                            <p><strong>e. Appointment:</strong></p>
                            <div className="appointment-section">
                                <p><strong>(i). Regular/ Contractual/ Ad-hoc basis:</strong> {user?.profile?.appointmentType1}</p>
                                <p><strong>(ii). Full time/ Part time:</strong> {user?.profile?.appointmentType2}</p>
                                <p><strong>(iii). With Private practice/ Without Private practice:</strong> {user?.profile?.appointmentType3}</p>
                            </div>
                            <p><strong>f. Date of appearance in last MCI/ NMC assessment:</strong></p>
                            <div className="date-section">
                                <p><strong>i. UG/ PG/ Any other:</strong> {user?.profile?.ugpgName}</p>
                                <p><strong>ii. Name of College:</strong> {user?.profile?.college}</p>
                                <p><strong>iii. Whether appeared and accepted at the same College:</strong> {user?.profile?.sameClgAcpt}</p>
                                <p><strong>iv. Whether appeared and accepted at the same designation:</strong> {user?.profile?.sameDestAcpt}</p>
                                <p><strong>v. Whether retired from Government Medical College:</strong> {user?.profile?.retiredStatus}</p>
                                <p><strong>vi. If yes, designation at the time of retirement:</strong> {user?.profile?.retireDestination}</p>
                            </div>
                        </div>
                    </div>
                    <div className="profile-photo">
                        <img
                            src={(user?.profileUrl === '' || user?.profileUrl === 'user.png') ? '/user.png' : user.profileUrl}
                            alt="upload profile url"
                            height={120}
                            width={100}
					    />
                    </div>
                </div>
                <div id="signatures">
                    <div>Signature of the Faculty</div>
                    <div>Signature & Seal of the Dean</div>
                </div>
            </div>
            <div className="page2">
                <p><strong>4. Complete Residential Address of the employee:</strong></p>
                <div className="address-section">
                    <p><strong>a. Present:</strong>{user?.profile?.residentialAddress}</p>
                    <p><strong>b. Permanent:</strong>{user?.profile?.perAddress}</p>
                </div>
                <p><strong>5. Copy of Proof of Residence submitted and original verified:</strong>{user?.profile?.residenceProofStatus}</p>
                <div className="smalltext">
                    <p>
                        (Only copies of Passport/ Aadhar card/ Voter ID/ Electricty bill/ Landline Phone bill will be considered)
                    </p>
                </div>
                <p><strong>6. Contact details:</strong></p>
                <div className="contact-section">
                    <p><strong>a. Office telephone with STD code:</strong>{user?.profile?.officeTel}</p>
                    <p><strong>b. Residence telephone with STD code:</strong>{user?.profile?.residenceTel}</p>
                    <p><strong>c. Mobile Phone Number: </strong>{user?.profile?.phoneNo}</p>
                    <p><strong>d. Email address:</strong> {user?.profile?.emailaddress}</p>
                </div> 
                <p><strong>7. Date of joining the present institution:</strong>{user?.profile?.dateOfJoining ? user?.profile?.dateOfJoining?.toString().slice(0, 10) : 'N/A'}</p>
                <p><strong>8. Joining report verified the present/ attached</strong>{user?.profile?.joiningStatus}</p>
                <p>
                    <strong>
                        9. Have you attended the Basic Course Workshop(BCME), Curriculum Implementation Support
                        Programme (CISP - i/ii/iii), Advanced Course in Medical Education (ACME) for training in MET:
                    </strong>                    
                </p>
                <div className="smalltext">
                    <p>(If Yes, provide certificate/s)</p>
                </div>
                <div className="workshopattened-section">
                    {user?.profile?.appearance?.map((appearance, index) => (
                        <div key={index}>
                            <p><strong>status</strong>{appearance?.status}</p>
                            <p><strong>a. at MCI/NMC Regional MET Centre:</strong> {appearance?.center}</p>
                            <p><strong>b. at your college under Regional/ Nodal observership:</strong> {appearance?.observership}</p>
                            <p><strong>c. Any other MET certificates may be attached:</strong> {appearance?.certs}</p>
                        </div>
                    ))}
                </div>
                <p><strong>10. Educational Qualifications</strong></p>
                <div className="education-section">
                    <table>
                        <thead>
                            <tr>
                                <th>Degree</th><th>Year</th><th>College Name</th>
                                <th>Registration Number with Date</th><th>Medical Council Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user?.profile?.educationalQualification?.length > 0 ? (
                                user.profile.educationalQualification.map((educationalQualification, index) => (
                                    <tr key={index}>
                                        <td>{educationalQualification.degree}</td>
                                        <td>{educationalQualification.year}</td>
                                        <td>{educationalQualification.collegeName}</td>
                                        <td>{educationalQualification.regNumWithDate}</td>
                                        <td>{educationalQualification.medicalCouncilName}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>No Educational Qualification data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="edu-section">
                        <p><strong>a. MD/ MS subject:</strong>{user?.profile?.mdmsSubject}</p>
                        <p><strong>b. DM/ Mch subject:</strong>{user?.profile?.dmmchSubject}</p>
                        <p><strong>c. PhD subject:</strong>{user?.profile?.phdSubject}</p>
                    </div>
                </div>
                <div className="smalltext">
                    <p>
                        <strong>Note:</strong>
                        For PG & Post PG qualifications, Particulars of Registation of Additional Qualification certificates
                        are to be furnished for them to be accepted. Strike out whichever section is not applicable 
                    </p>
                </div>                
            </div>
            <div className="page3">
                <p><strong>11. Copies of educational qualifications:</strong></p>  
                <div className="qualifications-section">
                    <p><strong>a. Copies of MBBS & PG Degree Certificates verified and attached:</strong>{user?.profile?.certStatus}</p>
                    <p><strong>b. Copies of MBBS & PG Degree Registation verified and attached:</strong>{user?.profile?.regStatus}</p>
                </div> 
                <p><strong>12. Details of Teaching experience till date:</strong></p>
                <div className="teaching-section">
                    <table>
                        <thead>
                            <tr>
                                <th>Designation</th><th>Department</th><th>Institution</th>
                                <th>From</th><th>To</th><th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user?.profile?.experience?.length > 0 ? (
                                user?.profile?.experience?.map((experience, index) => (
                                        <tr key={index}>
                                            <td>{experience.designationE}</td>
                                            <td>{experience.departmentE}</td>
                                            <td>{experience.institution}</td>
                                            <td>{experience.from ? experience.from?.toString().slice(0, 10) : 'Invalid Date'}</td>
                                            <td>{experience.to ? experience.to?.toString().slice(0, 10) : 'Invalid Date'}</td>
                                            <td>{experience.total}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6}>No data available</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="just-text-section">
                    <p>To be filled in by personnel from Indian Defence Service ONLY:</p>
                    <table>
                        <thead>
                            <th>Designation</th><th>Institution</th><th>From</th><th>To</th><th>Total</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Graded Specialist</td>
                                <td></td>
                                <td>_ _ / _ _ / _ _</td>
                                <td>_ _ / _ _ / _ _</td>
                                <td>(y)(m)</td>
                            </tr>
                            <tr>
                                <td>Classified Specialist</td>
                                <td></td>
                                <td>_ _ / _ _ / _ _</td>
                                <td>_ _ / _ _ / _ _</td>
                                <td>(y)(m)</td>
                            </tr>
                            <tr>
                                <td>Advisor</td>
                                <td></td>
                                <td>_ _ / _ _ / _ _</td>
                                <td>_ _ / _ _ / _ _</td>
                                <td>(y)(m)</td>
                            </tr>
                        </tbody>
                    </table>
                    <p><strong>* Note: Documents in support of each posting to be furnished for verification</strong></p>
                </div>
                <p>
                    <strong>
                        13. Have you been considered in UG/ PG, MCI/ NMC inspection at any other 
                        medical college ina teaching or administrative capacity during last 3 years. 
                        If yes, please give details:
                    </strong>
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Designtion</th><th>Subject</th><th>College</th><th>Dates</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user?.profile?.inspectionDetails?.length > 0 ? (
                            user?.profile?.inspectionDetails?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.designationI}</td>
                                    <td>{item.subject}</td>
                                    <td>{item.collegeI}</td>
                                    <td>{item.dates}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}>No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <p>
                    <strong>
                        14. Number of lectures/ small group teachings/ self-directed learning sessions/ clinics/ etc
                        taken and topics covered in last academic year (attach additional sheet, if required)
                    </strong>
                </p>
                <div className="number section">
                    <table>
                        <thead>
                            <th>Designation</th><th>Date</th><th>Lecture/ SGT/ Clinic/ others</th><th>Topic</th>
                        </thead>
                        <tbody>
                            {user?.profile?.numberOfLectures?.length > 0 ? (
                                user?.profile?.numberOfLectures?.map((numberOfLectures, index) => (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{numberOfLectures.dateL ? numberOfLectures.dateL?.toString().slice(0, 10) : 'Invalid Date'}</td>
                                        <td>{numberOfLectures.typeL}</td>
                                        <td>{numberOfLectures.topic}</td>
                                    </tr>
                                ))
                                ) : (
                                    <tr>
                                        <td colSpan={4}>No data available</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div> 
            <div className="page4">
                <p><strong>15. Details of employment before joining the present institution:</strong></p>
                <div className="details-section">
                    {user?.profile?.details && user.profile.details.length > 0 ? (
                        user.profile.details.map((details, index) => (
                            <div key={index}>
                                <p><strong>a. Name of College/ Institution:</strong> {details.detailsName}</p>
                                <p><strong>b. Designation:</strong> {details.designation} <strong>Date on which relieved:</strong> {details.dateD ? details.dateD?.toString().slice(0, 10) : 'Invalid Date'}</p>
                                <p><strong>c. Reason for being relieved:</strong> {details.relieveReason}</p>
                                <p><strong>d. Relieving order issued by previous institution verified and attached:</strong> {details.verification}</p>
                            </div>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
                <p><strong>16. PAN Card Number:</strong>{user?.profile?.panNo}</p>
                <p><strong>17. Aadhar Card Number:</strong>{user?.profile?.aadharNo}</p>
                <p><strong>18. I have drawn total emoluments from this college in the current financial year as under:</strong></p>
                <div className="enoluments-section">
                    <table>
                        <thead>
                            <tr><th>Month/Year</th><th>Amount Received</th><th>TDS</th></tr>
                        </thead>
                        <tbody>
                            {user?.profile?.emoluments?.length > 0 ? (
                                <tr>
                                    <td>{user.profile.emoluments[user.profile.emoluments.length - 1].month}/{user.profile.emoluments[user.profile.emoluments.length - 1].year}</td>
                                    <td>{user.profile.emoluments[user.profile.emoluments.length - 1].amount}</td>
                                    <td>{user.profile.emoluments[user.profile.emoluments.length - 1].tds}</td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan={3}>No emoluments data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <p><strong>19. Number of Research articles in Indexed Journals:</strong></p>
                <div className="research-section">
                    <p><strong>a. International Journals: </strong>{internationalCount || 0}</p>
                    <p><strong>b. National Journals: </strong>{nationalCount || 0}</p>
                    <p><strong>c. State/Institutional Journals: </strong>{stateInstitutionalCount || 0}</p>
                </div>
                <p><strong>20. Details of other publications:</strong></p>
                <div className='publication-section'>
                    <p><strong>a. Number of Books published: </strong>{booksPublished || 0}</p>
                    <p><strong>b. Number of Chapters in books: </strong>{totalChapters || 0}</p>
                </div>
            </div>
            <div className="page5">
                <p><strong>21. Any other information/ achievements/ patents:</strong></p>
                <div className="patent-section">
                    <table>
                        <thead>
                            <tr>
                                <th>Patent Country</th><th>Patent Number</th><th>Type</th><th>Date</th><th>Details of the inventor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user?.appraisal?.research?.patents?.length > 0 ? (
                                user?.appraisal?.research?.patents?.map((patent, index) => (
                                    <tr key={index}>
                                        <td>{patent.patentCountry}</td>
                                        <td>{patent.patentNumber}</td>
                                        <td>{patent.patentType}</td>
                                        <td>{patent.date ? patent.date?.toString().slice(0, 10) : 'Invalid Date'}</td>
                                        <td>
                                            {patent.detailsOfInventors && patent.detailsOfInventors.length > 0 ? (
                                                <div>
                                                    {patent.detailsOfInventors.map((inventor, i) => (
                                                        <div key={i} className="inventor-details">
                                                            <p>{inventor.number}.{inventor.name},{inventor.institute}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="no-inventor-details">
                                                    <p>No inventor information available</p>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>No Patent information available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="achievements-section">
                    <table>
                        <thead>
                            <tr>
                                <th>Serial No</th><th>Year</th><th>Information</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user?.appraisal?.professional?.achievements?.length > 0 ? (
                                user.appraisal?.professional?.achievements.map((achievements, index) => (
                                    <tr key={index}>
                                        <td>{achievements.serialNo}</td>
                                        <td>{achievements.year}</td>
                                        <td>{achievements.information}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3}>No achievements data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <p><strong>22. Oral presentations:</strong></p>
                <div className="conference-details">
                    <table>
                        <thead>
                            <tr>
                                <th>Category</th><th>Conference Name</th><th>Year</th><th>Details</th><th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user?.appraisal?.research?.conferences?.filter(conference => conference.category === 'Zonal' && conference.typeC === 'Oral').length > 0 ? (
                                user.appraisal?.research.conferences.filter(conference => conference.category === 'Zonal' && conference.typeC === 'Oral').map((conference, index) => (
                                    <tr key={index}>
                                        <td>{conference.category}</td>
                                        <td>{conference.confName}</td>
                                        <td>{conference.year}</td>
                                        <td>{conference.details}</td>
                                        <td>{conference.typeC}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>No oral presentations in zonal conferences available</td>
                                </tr>
                            )}
                            {user?.appraisal?.research?.conferences?.filter(conference => conference.category === 'State' && conference.typeC === 'Oral').length > 0 ? (
                                user?.appraisal?.research.conferences.filter(conference => conference.category === 'State' && conference.typeC === 'Oral').map((conference, index) => (
                                    <tr key={index}>
                                        <td>{conference.category}</td>
                                        <td>{conference.confName}</td>
                                        <td>{conference.year}</td>
                                        <td>{conference.details}</td>
                                        <td>{conference.typeC}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>No oral presentations in state conferences available</td>
                                </tr>
                            )}
                            {user?.appraisal?.research?.conferences?.filter(conference => conference.category === 'National' && conference.typeC === 'Oral').length > 0 ? (
                                user?.appraisal?.research.conferences.filter(conference => conference.category === 'National' && conference.typeC === 'Oral').map((conference, index) => (
                                    <tr key={index}>
                                        <td>{conference.category}</td>
                                        <td>{conference.confName}</td>
                                        <td>{conference.year}</td>
                                        <td>{conference.details}</td>
                                        <td>{conference.typeC}</td>
                                    </tr>
                                ))
                            ) : (
                               <tr>
                                    <td colSpan={5}>No oral presentations in national conferences available</td>
                                </tr>
                            )}
                            {user?.appraisal?.research?.conferences?.filter(conference => conference.category === 'International' && conference.typeC === 'Oral').length > 0 ? (
                                user?.appraisal?.research.conferences.filter(conference => conference.category === 'International' && conference.typeC === 'Oral').map((conference, index) => (
                                    <tr key={index}>
                                        <td>{conference.category}</td>
                                        <td>{conference.confName}</td>
                                        <td>{conference.year}</td>
                                        <td>{conference.details}</td>
                                        <td>{conference.typeC}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>No oral presentations in international conferences available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <p><strong>23. Poster presentations: in zonal/ State/ National/ International Conference.</strong></p>
                <div>
                    <div className="conference-details">
                        <table>
                            <thead>
                                <tr>
                                    <th>Category</th><th>Conference Name</th><th>Year</th><th>Details</th><th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user?.appraisal?.research?.conferences?.filter(conference => conference.category === 'Zonal' && conference.typeC === 'Poster').length > 0 ? (
                                    user?.appraisal?.research.conferences.filter(conference => conference.category === 'Zonal' && conference.typeC === 'Poster').map((conference, index) => (
                                        <tr key={index}>
                                            <td>{conference.category}</td>
                                            <td>{conference.confName}</td>
                                            <td>{conference.year}</td>
                                            <td>{conference.details}</td>
                                            <td>{conference.typeC}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5}>No Poster presentations in zonal conferences available</td>
                                    </tr>
                                )}
                                {user?.appraisal?.research?.conferences?.filter(conference => conference.category === 'State' && conference.typeC === 'Poster').length > 0 ? (
                                    user?.appraisal?.research.conferences.filter(conference => conference.category === 'State' && conference.typeC === 'Poster').map((conference, index) => (
                                        <tr key={index}>
                                            <td>{conference.category}</td>
                                            <td>{conference.confName}</td>
                                            <td>{conference.year}</td>
                                            <td>{conference.details}</td>
                                            <td>{conference.typeC}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5}>No Poster presentations in state conferences available</td>
                                    </tr>
                                )}
                                {user?.appraisal?.research?.conferences?.filter(conference => conference.category === 'National' && conference.typeC === 'Poster').length > 0 ? (
                                    user?.appraisal?.research.conferences.filter(conference => conference.category === 'National' && conference.typeC === 'Poster').map((conference, index) => (
                                        <tr key={index}>
                                            <td>{conference.category}</td>
                                            <td>{conference.confName}</td>
                                            <td>{conference.year}</td>
                                            <td>{conference.details}</td>
                                            <td>{conference.typeC}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5}>No Poster presentations in national conferences available</td>
                                    </tr>
                                )}
                                {user?.appraisal?.research?.conferences?.filter(conference => conference.category === 'International' && conference.typeC === 'Poster').length > 0 ? (
                                    user?.appraisal?.research.conferences.filter(conference => conference.category === 'International' && conference.typeC === 'Poster').map((conference, index) => (
                                        <tr key={index}>
                                            <td>{conference.category}</td>
                                            <td>{conference.confName}</td>
                                            <td>{conference.year}</td>
                                            <td>{conference.details}</td>
                                            <td>{conference.typeC}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5}>No Poster presentations in international conferences available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>                
                <p><strong>24. Awards/ prizes:</strong></p>
                <div className="awards-section">
                    <table>
                        <thead>
                            <tr>
                                <th>Awards</th><th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user?.appraisal?.research.conferences && user?.appraisal?.research.conferences.length > 0 ? (
                                user?.appraisal?.research.conferences?.map((conferences, index) => (
                                    <tr key={index}>
                                        <td>{conferences?.awards}</td>
                                        <td>{conferences?.description}</td>
                                    </tr>
                                ))
                                ) : (
                                    <tr>
                                        <td colSpan={2}>No Awards data available</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>        
        </div>
  );
};

export default PrintDetails;
