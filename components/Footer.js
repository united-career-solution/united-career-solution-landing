import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-brand-dark pt-20 pb-10 border-t border-brand-border/10">
            <div className="max-w-6xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <span className="font-heading font-bold text-white text-2xl tracking-tight">
                                United Career <span className="text-brand-accent">Solutions</span>
                            </span>
                        </Link>
                        <p className="text-white/50 mb-6 text-sm leading-relaxed">
                            Elevating hiring for ambitious candidates and growing companies across the US & UK. Premium talent, proven strategies.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold text-white mb-6">For Candidates</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/candidate" className="text-white/60 hover:text-white transition-colors duration-200">Career Strategy</Link></li>
                            <li><Link href="/candidate" className="text-white/60 hover:text-white transition-colors duration-200">Resume Optimization</Link></li>
                            <li><Link href="/candidate" className="text-white/60 hover:text-white transition-colors duration-200">US & UK Placement</Link></li>
                            <li><Link href="/candidate" className="text-white/60 hover:text-white transition-colors duration-200">Interview Prep</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold text-white mb-6">For Employers</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/employer" className="text-white/60 hover:text-white transition-colors duration-200">Hire Talent</Link></li>
                            <li><Link href="/employer" className="text-white/60 hover:text-white transition-colors duration-200">Pre-vetted Candidates</Link></li>
                            <li><Link href="/employer" className="text-white/60 hover:text-white transition-colors duration-200">Fast Turnaround</Link></li>
                            <li><Link href="/employer" className="text-white/60 hover:text-white transition-colors duration-200">Our Process</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/about" className="text-white/60 hover:text-white transition-colors duration-200">About Us</Link></li>
                            <li><Link href="/contact" className="text-white/60 hover:text-white transition-colors duration-200">Contact</Link></li>
                            <li><Link href="#" className="text-white/60 hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
                            <li><Link href="#" className="text-white/60 hover:text-white transition-colors duration-200">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-white/40">
                        &copy; {new Date().getFullYear()} United Career Solutions. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
