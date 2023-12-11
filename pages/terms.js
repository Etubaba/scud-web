import Link from "next/link";
import { Router, useRouter } from "next/router";
import React from "react";
import Button from "../components/common/Button";
import SubFooter from "../components/footer/SubFooter";
import LastSection from "../components/homeComponents/sections/LastSection";
import MobileLastsection from "../components/homeComponents/sections/MobileLastsection";
function terms() {
  const anchors = [
    {
      section: "Contractual Relationship",
      link: "/terms#Contractual_Relationship"
    },
    {
      section: "License",
      link: "/terms#License"
    },
    {
      section: "Restrictions",
      link: "/terms#Restrictions"
    },
    {
      section: "Ownership",
      link: "/terms#Ownership"
    },
    {
      section: "User Accounts",
      link: "/terms#User_Accounts"
    },
    {
      section: "User Requirements and Conduct",
      link: "/terms#User_Requirements_and_Conduct"
    },
    {
      section: "Promotional Codes",
      link: "/terms#Promotional_Codes"
    },
    {
      section: "User Provided Content",
      link: "/terms#User_Provided_Content"
    },
    {
      section: "Network Access and Devices",
      link: "/terms#Network_Access_and_Devices"
    },
    {
      section: "Payment",
      link: "/terms#Payment"
    },
    {
      section: "General",
      link: "/terms#General"
    }
  ];

  const router = useRouter();
  return (
    <div>
      <div className="hidden md:block bg-[url('/unsplash_n95VMLxqM2Ivv.png')] bg-center md:bg-[url('/unsplash_n95VMLxqM2I.png')]   bg-no-repeat  md:object-contain w-full h-[200px] md:h-[350px] ">
        <div className="bg-scudGreen/60 w-full flex flex-col justify-center items-center h-full">
          <b className="text-3xl text-white">Terms of Service</b>
          <p className="text-sm text-white">Last updated: April 16, 2022</p>
        </div>
      </div>
      <div className="flex relative">
        <div className="w-1/5 hidden md:block shadow-md h-screen p-6  ">
          {anchors.map((item, index) => (
            <Link href={item.link} className="hover:text-scudGreen cursor-pointer">
              <p
                key={index}
                className={
                  item.link == router.asPath
                    ? "mb-6 text-scudGreen cursor-pointer font-semibold text-sm"
                    : "mb-6 hover:text-scudGreen cursor-pointer font-semibold text-sm"
                }
              >
                {item.section}
              </p>
            </Link>
          ))}
        </div>
        <div className=" w-full md:w-4/5 h-[600px] tracking-[0.04em] overflow-y-scroll ">
          <div className=" block md:hidden bg-[url('/unsplash_n95VMLxqM2Ivv.png')] bg-center sm:bg-[url('/unsplash_n95VMLxqM2I.png')]   bg-no-repeat  sm:object-contain w-full h-[200px] md:h-[350px] ">
            <div className="bg-scudGreen/60 w-full flex flex-col justify-center items-center h-full">
              <b className="text-3xl text-white">Terms of Service</b>
              <p className="text-sm text-white">Last updated: April 16, 2022</p>
            </div>
          </div>
          <div className="p-3  md:p-7">
            <div className="space-y-5  pb-20">
              <div id="Contractual_Relationship" className="space-y-3  ">
                <p className="font-bold">1. Contractual Relationship</p>
                <p className="">
                  These Terms of Use ("Terms") administer the entrance or use by you, a person, from
                  inside any nation in the realm of utilizations, sites, substance, items, and
                  administrations (the "Administrations")
                </p>

                <p>
                  It would be ideal if you
                  <span className="font-bold">
                    &nbsp;READ THESE TERMS CAREFULLY BEFORE ACCESSING OR USING THE SERVICES.
                  </span>
                </p>

                <p>
                  Your entrance and utilization of the Services comprises your consent to be bound
                  by these Terms, which builds up a legally binding connection among you and Scud.
                  In the event that you don't consent to these Terms, you may not access or utilize
                  the Services. These Terms explicitly override earlier understandings or courses of
                  action with you. Scud may quickly end these Terms or any Services as for you, or
                  by and large stop offering or deny access to the Services or any segment thereof,
                  whenever for any reason.
                </p>
                <p>
                  Supplemental terms may apply to specific Services, for example, approaches for a
                  specific occasion, movement or advancement, and such supplemental terms will be
                  unveiled to you regarding the material Services. Supplemental terms are
                  notwithstanding, and will be esteemed a piece of, the Terms for the motivations
                  behind the material Services. Supplemental terms will beat these Terms in case of
                  a contention regarding the pertinent Services.
                </p>
                <p>
                  Scud may correct the Terms identified with the Services every once in a while.
                  Alterations will be compelling upon Scud' posting of such refreshed Terms at this
                  area or the changed arrangements or supplemental terms on the relevant Service.
                  Your proceeded with access or utilization of the Services after such presenting
                  establishes your assent on be bound by the Terms, as altered.
                </p>
                <p>
                  Scud Technology Limited may give to a cases processor or a safety net provider any
                  fundamental data (counting your contact data) if there is a dissension, debate or
                  strife, which may incorporate a mishap, including you and a Third Party Provider
                  and such data or information is important to determine the grumbling, question or
                  struggle.
                </p>
              </div>
              <div id="License" className="space-y-3  ">
                <p className="font-bold">2. License</p>
                <p>
                  Subject to your consistence with these Terms, Scud awards you a constrained,
                  non-elite, non-sublicensable, revocable, non-transferrable permit to: (I) access
                  and utilize the Applications on your own gadget exclusively regarding your
                  utilization of the Services; and (ii) access and utilize any substance, data and
                  related materials that might be made accessible through the Services, for each
                  situation exclusively for your own, noncommercial use. Any rights not explicitly
                  allowed in this are held by Scud and Scud' licensors.
                </p>
              </div>
              <div id="Restrictions" className="space-y-3  ">
                <p className="font-bold">3. Restrictions</p>
                <p>
                  You may not:
                  <br />
                  <span className="font-bold">(I)</span> evacuate any copyright, trademark or other
                  exclusive notification from any bit of the Services;
                  <br /> <span className="font-bold">(ii)</span> replicate, change, get ready
                  subsidiary works dependent on, circulate, permit, rent, move, exchange, exchange,
                  freely show, openly perform, transmit, stream, communicate or generally misuse the
                  Services aside from as explicitly allowed by Scud; <br />
                  <span className="font-bold">(iii)</span> decompile, figure out or dismantle the
                  Services with the exception of as might be allowed by material law;,
                  <br /> <span className="font-bold"> (iv)</span> connection to, mirror or edge any
                  bit of the Services;
                  <br /> <span className="font-bold">(v)</span> cause or dispatch any projects or
                  contents to scrape, ordering, looking over, or generally information mining any
                  part of the Services or unduly loading or frustrating the task as well as
                  usefulness of any part of the Services; or <br />
                  <span className="font-bold">(vi)</span> endeavor to increase unapproved access to
                  or disable any part of the Services or its related frameworks or systems.
                </p>
              </div>
              <div id="Ownership" className="space-y-3  ">
                <p className="font-bold">4. Ownership</p>
                <p>
                  The Services and all rights in that are and will remain Scud' property or the
                  property of Scud' licensors. Neither these Terms nor your utilization of the
                  Services pass on or concede to you any rights: <br />
                  <span className="font-bold">(I)</span> in or identified with the Services aside
                  from the constrained permit allowed above; or <br />
                  <span className="font-bold">(ii)</span> to utilize or reference in any way Scud'
                  organization names, logos, item and administration names, trademarks or
                  administrations marks or those of Scud' licensors.
                </p>
              </div>
              <div id="User_Accounts" className="space-y-3  ">
                <p className="font-bold">5. User Accounts</p>
                <p>
                  User Accounts So as to utilize most parts of the Services, you should enroll for
                  and keep up a functioning individual client Services ("Account"). You should be
                  around 18 years old, or the time of lawful larger part in your locale (if not
                  quite the same as 18), to acquire an Account. Record enlistment expects you to
                  submit to Scud certain individual data, for example, your name, address, cell
                  phone number and age, and additionally no less than one substantial installment
                  technique (either a charge card or acknowledged installment accomplice). You
                  consent to keep up exact, finish, and up and coming data in your Account.
                </p>
                <p>
                  Your inability to keep up exact, finish, and up and coming Account. data,
                  including having an invalid or lapsed installment strategy on document, may result
                  in your powerlessness to access and utilize the Services or Scud' end of these
                  Terms with you. You are in charge of all movement that happens under your Account,
                  and you consent to keep up the security and mystery of your Account username and
                  secret key consistently. Except if generally allowed by Scud in thinking of, you
                  may just have one Account.
                </p>
              </div>
              <div id="User_Requirements_and_Conduct" className="space-y-3  ">
                <p className="font-bold">6. User Requirements and Conduct</p>
                <p>
                  User Requirements and Conduct. The Service isn't accessible for use by people
                  younger than 18. You may not approve outsiders to utilize your Account, and you
                  may not permit people younger than 18 to get transportation or coordinations
                  administrations from Third Party Providers except if they are joined by you. You
                  may not relegate or generally exchange your Account to some other individual or
                  substance. You consent to follow every single pertinent law when utilizing the
                  Services, and you may just utilize the Services for legal purposes (e.g., no
                  vehicle of unlawful or perilous materials).
                </p>
                <p>
                  You won't, in your utilization of the Services, cause disturbance, irritation,
                  burden, or property harm, regardless of whether to the Third Party Provider or
                  some other gathering. In specific occurrences you might be solicited to give
                  confirmation from identity to access or utilize the Services, and you concur that
                  you might be denied access to or utilization of the Services in the event that you
                  decline to give evidence of personality.
                </p>
              </div>
              <div id="Promotional_Codes" className="space-y-3  ">
                <p className="font-bold">7. Promotional Codes</p>
                <p>
                  Scud may, in Scud' sole circumspection, make limited time codes that might be
                  reclaimed for Account credit, or different highlights or advantages identified
                  with the Services as well as a Third Party Provider's administrations, subject to
                  any extra terms that Scud sets up on a for every special code premise ("Promo
                  Codes"). You concur that Promo Codes: (I) must be utilized for the target group
                  and reason, and in a legal way; (ii) may not be copied, sold or moved in any way,
                  or made accessible to the overall population (regardless of whether presented on
                  an open frame or something else), except if explicitly allowed by Scud; (iii)
                  might be crippled by Scud whenever for any reason without risk to Scud; (iv) may
                  just be utilized as per the explicit terms that Scud sets up for such Promo Code;
                  (v) are not substantial for money; and (vi) may lapse preceding your utilization.
                </p>
                <p>
                  Scud maintains whatever authority is needed to retain or deduct credits or
                  different highlights or advantages acquired using Promo Codes by you or some other
                  client if Scud decides or trusts that the utilization or reclamation of the Promo
                  Code was in blunder, deceitful, unlawful, or disregarding the pertinent Promo Code
                  terms or these Terms.
                </p>
              </div>
              <div id="User_Provided_Content" className="space-y-3  ">
                <p className="font-bold">8. User Provided Content</p>
                <p>
                  Scud may, in Scud' sole carefulness, allow you now and again to submit, transfer,
                  distribute or generally make accessible to Scud through the Services literary,
                  sound, or potentially visual substance and data, including critique and criticism
                  identified with the Services, commencement of help solicitations, and
                  accommodation of passages for rivalries and advancements ("User Content").
                </p>
                <p>
                  Any User Content given by you remains your property. In any case, by giving User
                  Content to Scud, you give Scud an around the world, unending, permanent,
                  transferrable, eminence free permit, with the privilege to sublicense, to utilize,
                  duplicate, adjust, make subordinate works of, appropriate, openly show, freely
                  perform, and generally misuse in any way such User Content in all arrangements and
                  dissemination channels currently known or in the future contrived (incorporating
                  into association with the Services and Scud' the same old thing and on outsider
                  locales and administrations), without further notice to or assent from you, and
                  without the prerequisite of installment to you or some other individual or
                  element.
                </p>
                <p>
                  You speak to and warrant that: (I) you either are the sole and select proprietor
                  of all User Content or you have all rights, licenses, assents and discharges
                  important to give Scud the permit to the User Content as put forward above; and
                  (ii) neither the User Content nor your accommodation, transferring, distributing
                  or generally making accessible of such User Content nor Scud' utilization of the
                  User Content as allowed in this will encroach, abuse or damage an outsider's
                  protected innovation or exclusive rights, or privileges of exposure or security,
                  or result in the infringement of any relevant law or direction.
                </p>
                <p>
                  You consent to not give User Content that is slanderous, derogatory, contemptuous,
                  savage, profane, obscene, unlawful, or generally hostile, as controlled by Scud in
                  its sole watchfulness, regardless of whether such material might be secured by
                  law. Scud may, however will not be committed to, survey, screen, or evacuate User
                  Content, at Scud' sole prudence and whenever and for any reason, without notice to
                  you.
                </p>
              </div>
              <div id="Network_Access_and_Devices" className="space-y-3  ">
                <p className="font-bold">9. Network Access and Devices</p>
                <p>
                  You are in charge of getting the information arrange get to important to utilize
                  the Services. Your portable system's information and informing rates and expenses
                  may apply on the off chance that you access or utilize the Services from a remote
                  empowered gadget and you will be in charge of such rates and charges. You are in
                  charge of getting and refreshing perfect equipment or gadgets important to access
                  and utilize the Services and Applications and any updates thereto.
                </p>
                <p>
                  Scud does not ensure that the Services, or any segment thereof, will work on a
                  specific equipment or gadgets. Also, the Services might be liable to glitches
                </p>
              </div>
              <div id="Payment" className="space-y-3  ">
                <p className="font-bold">10. Payment</p>
                <p>
                  You comprehend that utilization of the Services may result in charges to you for
                  the administrations or merchandise you get from a Third Party Provider
                  ("Charges"). After you have gotten administrations or products acquired through
                  your utilization of the Service, Scud will encourage your installment of the
                  material Charges for the benefit of the Third Party Provider thusly Third Party
                  Provider's constrained installment accumulation operator. Installment of the
                  Charges in such way will be viewed as equivalent to installment made
                  straightforwardly by you to the Third Party Provider.
                </p>
                <p>
                  Charges will be comprehensive of relevant expenses where required by law. Charges
                  paid by you are conclusive and non-refundable, except if generally dictated by
                  Scud. You hold the privilege to ask for lower Charges from a Third Party Provider
                  for administrations or products gotten by you from such Third Party Provider at
                  the time you get such administrations or merchandise. Scud will react in like
                  manner to any demand from a Third Party Provider to adjust the Charges for a
                  specific administration or great.
                </p>
                <p>
                  All Charges are expected quickly and installment will be encouraged by Scud
                  utilizing the favored installment technique assigned in your Account, after which
                  Scud will send you a receipt by email. In the event that your essential Account
                  installment strategy is resolved to be terminated, invalid or generally not ready
                  to be charged, you concur that Scud may, as the Third Party Provider's constrained
                  installment accumulation specialist, utilize an optional installment technique in
                  your Account, if accessible.
                </p>
                <p>
                  As among you and Scud, Scud claims all authority to set up, expel as well as
                  change Charges for any or all administrations or products acquired using the
                  Services whenever in Scud' sole caution. Further, you recognize and concur that
                  Charges material in certain topographical zones may increment significantly amid
                  times of appeal. Scud will utilize sensible endeavors to advise you of Charges
                  that may apply, gave that you will be in charge of Charges brought about under
                  your Account paying little mind to your consciousness of such Charges or the sums
                  thereof. Scud may every once in a while give certain clients special offers and
                  limits that may result in various sums charged for the equivalent or comparative
                  administrations or products got using the Services, and you concur that such
                  special offers and limits, except if likewise made accessible to you, will make
                  little difference to your utilization of the Services or the Charges connected to
                  you. You may choose to drop your demand for administrations or merchandise from a
                  Third Party Provider whenever before such Third Party Provider's landing, in which
                  case you might be charged an abrogation expense.
                </p>
                <p>
                  This installment structure is planned to completely repay the Third Party Provider
                  for the administrations or products gave. Aside from as for cab transportation
                  administrations asked for through the Application, Scud does not assign any bit of
                  your installment as a tip or tip to the Third Party Provider. Any portrayal by
                  Scud (on Scud' site, in the Application, or in Scud' advertising materials) such
                  that tipping is "deliberate," "not required," as well as "included" in the
                  installments you make for administrations or products gave isn't proposed to
                  recommend that Scud gives any extra sums, past those depicted above, to the Third
                  Party Provider. You comprehend and concur that, while you are allowed to give
                  extra installment as a tip to any Third Party Provider who gives you
                  administrations or products acquired through the Service, you are under no
                  commitment to do as such. Tips are deliberate. After you have gotten
                  administrations or merchandise acquired through the Service, you will have the
                  chance to rate your experience and leave extra criticism about your Third Party
                  Provider.
                </p>
              </div>
              <div id="General" className="space-y-3  ">
                <p className="font-bold">11. General</p>
                <p>
                  You may not dole out or move these Terms in entire or partially without Scud'
                  earlier composed endorsement. You give your endorsement to Scud for it to appoint
                  or move these Terms in entire or to some extent, including to:
                  <br />
                  <span className="font-bold">(I)</span> a backup or associate;
                  <br />
                  <span className="font-bold">(ii)</span> an acquirer of Scud' value, business or
                  resources; or <br />
                  <span className="font-bold">(iii)</span> a successor by merger. No joint endeavor,
                  association, business or office relationship exists between you, Scud or any Third
                  Party Provider because of the agreement among you and Scud or utilization of the
                  Services.
                </p>
                <p>
                  On the off chance that any arrangement of these Terms is held to be unlawful,
                  invalid or unenforceable, in entire or to some extent, under any law, such
                  arrangement or part thereof will to that degree be regarded not to frame some
                  portion of these Terms but rather the lawfulness, legitimacy and enforceability of
                  alternate arrangements in these Terms will not be influenced.
                </p>
                <p>
                  In that occasion, the gatherings will supplant the illicit, invalid or
                  unenforceable arrangement or part thereof with an arrangement or part thereof that
                  is legitimate, substantial and enforceable and that has, to the best degree
                  conceivable, a comparable impact as the unlawful, invalid or unenforceable
                  arrangement or part thereof, given the substance and reason for these Terms.
                </p>
                <p>
                  These Terms comprise the whole ascension and comprehension of the gatherings as
                  for its topic and replaces and overrides all earlier or contemporaneous
                  understandings or endeavors with respect to such topic. In these Terms, the words
                  "counting" and "incorporate" signify "counting, however not restricted to."
                </p>
              </div>
            </div>
            <div className=" bg-white w-full flex justify-center absolute p-5 left-0 bottom-0">
              <div className="flex space-x-10">
                {/* <Button
                  // onClick={() => dispatch(modalToggle(true))}
                  // onClick={() => setOpened(true)}
                  text={"Decline"}
                  secondary={true}
                /> */}
                <Button onClick={() => router.back()} text={"Accept"} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <LastSection />
      <MobileLastsection /> */}
    </div>
  );
}
export default terms;
