import{G as r,j as e,S as a,x as d}from"./app-32834012.js";import{G as l}from"./GuestLayout-b65cdce6.js";import{P as m}from"./PrimaryButton-01d864da.js";/* empty css            */import"./ApplicationLogo-135f9295.js";function h({status:t}){const{post:i,processing:s}=r({}),n=o=>{o.preventDefault(),i(route("verification.send"))};return e.jsxs(l,{children:[e.jsx(a,{title:"Email Verification"}),e.jsx("div",{className:"mb-4 text-sm text-gray-600",children:"Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another."}),t==="verification-link-sent"&&e.jsx("div",{className:"mb-4 font-medium text-sm text-green-600",children:"A new verification link has been sent to the email address you provided during registration."}),e.jsx("form",{onSubmit:n,children:e.jsxs("div",{className:"mt-4 flex items-center justify-between",children:[e.jsx(m,{disabled:s,children:"Resend Verification Email"}),e.jsx(d,{href:route("logout"),method:"post",as:"button",className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Log Out"})]})})]})}export{h as default};
