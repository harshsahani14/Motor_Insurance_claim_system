import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuImage } from "react-icons/lu";

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


    const location = useLocation();

    const { claim } = location.state || {};

    console.log(claim)


  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">


        <p className=" text-[30px] mb-2 font-bold text-center ">Claim details</p>
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 md:p-8">
        
          

          <div className="text-center">
            <div className="text-sm uppercase tracking-wide text-gray-500">
              Claim Amount
            </div>
            <div className="text-2xl font-bold text-gray-900 md:text-3xl">{claim.amount}</div>
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
            placeholder="Decision note (optional)"
            className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
            rows={5}
          ></textarea>
          <div className="mt-4 flex gap-3">
            <button className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-900">
              Approve
            </button>
            <button className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700">
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
