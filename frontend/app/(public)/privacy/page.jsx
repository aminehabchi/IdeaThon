"use client";

import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: September 27, 2025</p>

      <p className="mb-6">
        Welcome to <strong>Ideathoon</strong>! We value your privacy and want you to
        understand how we handle your information when you use our platform.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Your name, email address, and account details.</li>
        <li>Information related to ideathons you host or participate in.</li>
        <li>Basic activity data (such as submissions, votes, or interactions).</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Enable hosting and participation in ideathons.</li>
        <li>Select and announce winners.</li>
        <li>Ensure transparency, such as knowing who created what submissions.</li>
        <li>Help connect members and support a sense of community.</li>
        <li>Improve the platform and provide better user experiences.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">Sharing Your Information</h2>
      <p className="mb-6">
        We do <strong>not</strong> sell or rent your personal information. Your
        information may be shared only when:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Required by law.</li>
        <li>Necessary to provide core platform functions (e.g., announcing winners).</li>
        <li>You give explicit consent.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">Data Security</h2>
      <p className="mb-6">
        We take reasonable measures to protect your data. However, no method of
        transmission over the internet is 100% secure.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">Your Choices</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Update or delete your account information at any time.</li>
        <li>Contact us if you have concerns about your data.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
      <p className="mb-6">
        If you have any questions about this Privacy Policy, please reach out to us
        at: <strong>privacy@ideathoon.com</strong>
      </p>

      <hr className="my-8" />
      <p className="text-gray-600 text-sm">
        By using Ideathoon, you agree to this Privacy Policy.
      </p>
    </div>
  );
}
