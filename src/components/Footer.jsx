
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className='bg-teal-600 text-slate-100 py-10'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 container px-5 md:mx-auto'>
				<div>
					<h1 className='text-xl font-medium mb-2 text-slate-200'>
						About Sansi
					</h1>
					<p className='mb-2 text-slate-100'>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae
						sint iste voluptatum adipisci aspernatur temporibus dolores, eveniet
						provident unde quisquam!
					</p>

					<h4>Trade Licence: TRAD/DNCC/121502/2022</h4>
				</div>
				<div>
					<h1 className='text-xl font-medium mb-2 text-slate-200'>
						Get In Touch
					</h1>
					<div className='flex flex-col gap-1 md:gap-2'>
						<h2>7/B-ka, West Hazipara, Rampura, Dkaka-121</h2>
						<h2>Mobile: +880 1719 049220</h2>
						<Link target='_blank' to='https://facebook.com/arif.p2b'>
							Facebook
						</Link>
						<Link target='_blank' to='https://facebook.com/arif.p2b'>
							Instagram
						</Link>
						<Link target='_blank' to='https://facebook.com/arif.p2b'>
							YouTube
						</Link>
					</div>
				</div>
				<div>
					<h1 className='text-xl font-medium mb-2 text-slate-200'>
						{" "}
						QUICK LINKS
					</h1>
					<ul className='flex flex-col gap-1 md:gap-2'>
						<li>
							<Link to={"/about-us"}>About Us</Link>
						</li>
						<li>
							<Link to={"/privacy-policy"}>Privacy Policy</Link>
						</li>
						<li>
							<Link to={"/shipping"}>Shipping Policy</Link>
						</li>
						<li>
							<Link to={"/terms"}>Terms & Conditions</Link>
						</li>
						<li>
							<Link to={"/return"}>Return & Refund Policy</Link>
						</li>
					</ul>
				</div>
				<div>
					<h1 className='text-xl font-medium mb-2 text-slate-200'>
						NEWSLETTER
					</h1>
					<div className='flex flex-col gap-2'>
						<h3>
							Sign up for our e-mail and be the first who knows our special
							offers!
						</h3>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
