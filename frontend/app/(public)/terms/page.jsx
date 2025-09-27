"use client";

import React from "react";

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: September 27, 2025</p>

      <p className="mb-6">
        Welcome to <strong>Ideathoon</strong>! By using our platform, you agree to these Terms of Service. Please read them carefully.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">Using Ideathoon</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>You must provide accurate information when creating an account.</li>
        <li>You are responsible for keeping your account secure.</li>
        <li>Do not use Ideathoon for illegal, harmful, or abusive activities.</li>
        <li>Respect other members and their submissions.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">Content</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>You keep ownership of the content you submit (ideas, projects, etc.).</li>
        <li>By submitting content, you give Ideathoon permission to display it for ideathons and community use.</li>
        <li>We may remove content that violates these terms or is harmful.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">Platform Ownership</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>All software, branding, and platform features belong to Ideathoon.</li>
        <li>You may not copy, modify, or use them outside the platform without permission.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">Disclaimers</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Ideathoon is provided “as is.” We cannot guarantee uninterrupted service.</li>
        <li>We are not responsible for losses or damages caused by misuse of the platform.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">Termination</h2>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>We may suspend or delete accounts that break these terms or harm the community.</li>
        <li>You may delete your account at any time.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">Changes to Terms</h2>
      <p className="mb-6">
        We may update these terms occasionally. Continued use of Ideathoon means you accept the changes.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
      <p className="mb-6">
        If you have questions about these Terms, contact us at: <strong>support@ideathoon.com</strong>
      </p>

      <hr className="my-8" />
      <p className="text-gray-600 text-sm">
        By using Ideathoon, you agree to these Terms of Service.
      </p>
    </div>
  );
}
