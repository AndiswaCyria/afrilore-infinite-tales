import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BookOpen } from "lucide-react";
import Navigation from "@/components/Navigation";

const helpArticles = [
	{
		title: "Getting Started with Afrilore",
		content: "Learn how to sign up, navigate the platform, and discover amazing books from African writers.",
	},
	{
		title: "Managing Your Subscription",
		content: "Understand billing cycles, upgrade/downgrade options, and how to cancel anytime.",
	},
	{
		title: "Reading Offline",
		content: "How to download books to read without internet access on your preferred device.",
	},
	{
		title: "Student Discount",
		content: "We offer a 50% discount to verified students. Find out how to apply.",
	},
];

const HelpCenter = () => {
	const [search, setSearch] = useState("");

	const filteredArticles = helpArticles.filter((article) =>
		article.title.toLowerCase().includes(search.toLowerCase())
	);

	return (
		<>
			<Navigation />
			<section className="py-20 bg-muted/10">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold font-playfair text-foreground">Help Center</h2>
						<p className="text-muted-foreground mt-2">Find answers to common questions or browse our support articles.</p>
					</div>

					<div className="max-w-xl mx-auto mb-10">
						<Input
							placeholder="Search articles..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="bg-background border-border"
						/>
					</div>

					<div className="grid md:grid-cols-2 gap-6">
						{filteredArticles.map((article, index) => (
							<Card key={index}>
								<CardHeader>
									<CardTitle className="text-lg text-foreground">{article.title}</CardTitle>
								</CardHeader>
								<CardContent className="text-muted-foreground">{article.content}</CardContent>
							</Card>
						))}
						{filteredArticles.length === 0 && (
							<p className="text-center col-span-2 text-muted-foreground">No articles found for your search.</p>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default HelpCenter;
