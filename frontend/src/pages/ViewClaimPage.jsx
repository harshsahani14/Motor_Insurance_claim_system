import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuImage } from "react-icons/lu";
import toast from "react-hot-toast";
import { useSelector } from "react-redux"
import { useState } from "react";
import GoBackButton from "../components/GoBackButton";

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start gap-3 py-1">
      <div className="w-40 shrink-0 text-sm font-bold text-gray-600">
        {label}
      </div>
      <div className="text-sm text-gray-900">{value}</div>
    </div>
  );
}

function FileItem({ name, link }) {

    const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
      <div>
        <div className="text-sm font-medium text-gray-900">{name}</div>

      </div>
      <Link
        to={link}
        target="_blank"
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-[.98]"
      >
        <LuImage className="h-4 w-4" />
        View {name}
      </Link>
    </div>
  );
}



export default function ViewClaimPage() {


    const [remark,setRemark] = useState("");

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    const location = useLocation();

    const { claim } = location.state || {};

    

    const handleRejection = async() => {

        const toastId = toast.loading("Rejecting claim...");
        try {
            const response = await fetch('http://localhost:8080/api/claims/rejectClaim',{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    remark:remark,
                    claimId: claim.claimId,
                    approverId: user.value.approverId
            })});

            toast.success("Claim rejected successfully");
            navigate('/dashboard/approver/pending-claims');
            return;

        } catch (error) {
            toast.error("Error rejecting claim");
            return;
        }
        finally {
            toast.dismiss(toastId);
        }

    }

    const handleApproval = async() => { 

        const toastId = toast.loading("Approving claim...");
        try {
            const response = await fetch('http://localhost:8080/api/claims/approveClaim',{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    remark:remark,
                    claimId: claim.claimId,
                    approverId: user.value.approverId
            })});

            
            if(response.status !== 200) {
                console.log(response);
                return
            }
            toast.success("Claim approved successfully");
            navigate('/dashboard/approver/pending-claims');
            return;

        } catch (error) {
            toast.error("Error approving claim");
            return;
        }
        finally {
            toast.dismiss(toastId);
        }
    }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">


        <p className=" text-[30px] mb-2 font-bold text-center ">Claim details</p>
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 md:p-8">
        
          

          <div className="text-center">
            <div className="text-sm uppercase tracking-wide text-gray-500">
              Claim Amount
            </div>
            <div className="text-2xl font-bold text-gray-900 md:text-3xl">${claim.amount}</div>
          </div>


        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <InfoRow label="Vehicle Number" value={claim.vehicleNo}/>
          <InfoRow label="RC Number" value={claim.rcNo} />
          <InfoRow label="Name of Person" value={claim.user.name} />
          <InfoRow label="Contact Number" value={claim.user.contact} />
          <InfoRow label="Email Id" value={claim.user.email} />
          <InfoRow label="DL Number" value={claim.dlNo} />
          <InfoRow label="Policy Number" value={claim.policyNo} />
          <InfoRow label="Incident Date" value={claim.incidentDate} />
          <InfoRow label="Incident Location" value={claim.incidentLocation} />
          <InfoRow label="Claim Amount" value={claim.amount} />
        </div>

        <div className="mt-6">
          <h2 className="text-sm font-bold text-gray-800">Incident Details</h2>
          <p className="mt-2 text-sm text-gray-700">
           {claim.incidentDetails}
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">Documents</h2>
          <FileItem name="Vehicle Image 1" link={claim.vehicleImage1}  />
          <FileItem name="Vehicle Image 2" link={claim.vehicleImage2} />
          <FileItem name="Registration certificate" link={claim.rcImage} />
          <FileItem name="Driving license" link={claim.dlImage} />
        </div>

        <div className="mt-8 flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-800">Remarks</label>
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Decision note (optional)"
            className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            rows={5}
          ></textarea>
          <div className="mt-4 flex justify-between items-center">
            <div className=" flex gap-3">
            <button 
            onClick={handleApproval}
            className="px-4 py-2 border bg-black text-white  rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300">
              Approve
            </button>
            <button 
                onClick={handleRejection}
            className="rounded-lg bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 px-5 py-2 text-sm font-medium text-white hover:bg-red-700">
              Reject
            </button>
            </div>

            <GoBackButton />
          </div>
        </div>
      </div>
    </div>
  );
}
