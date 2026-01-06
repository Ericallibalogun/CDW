"use client";

import { subscribeAction } from "@/app/_actions/subscribe";
import { SubscribeSchema } from "@/app/schemas/subscribe.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckIcon, CircleX, Loader2 } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const SubscribeButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button
			disabled={pending}
			type="submit"
			className="w-full uppercase font-bold bg-gradient-to-r from-brand-navy-600 to-brand-navy-700 hover:from-brand-navy-700 hover:to-brand-navy-800 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
		>
			{pending && (
				<Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
			)}{" "}
			Subscribe Now
		</Button>
	);
};
export const NewsletterForm = () => {
	const [state, formAction] = useActionState(subscribeAction, {
		success: false,
		message: "",
	});

	const [showMessage, setShowMessage] = useState(false);

	const form = useForm({
		resolver: zodResolver(SubscribeSchema),
		mode: "onChange",
	});

	const handleFormAction = async (formData: FormData) => {
		const valid = await form.trigger();
		if (!valid) return;
		formAction(formData);
	};

	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (state.success && formRef.current) {
			formRef.current.reset();
			setShowMessage(true);
		}
	}, [state.success]);

	useEffect(() => {
		if (state.message && !state.success) {
			setShowMessage(true);
		}
	}, [state.message, state.success]);

	// Auto-dismiss messages after 5 seconds
	useEffect(() => {
		if (showMessage) {
			const timer = setTimeout(() => {
				setShowMessage(false);
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [showMessage]);

	return (
		<div className="space-y-6">
			<h3 className="text-xl font-bold text-white mb-6 flex items-center">
				<div className="w-1 h-6 bg-gradient-to-b from-brand-navy-400 to-brand-navy-500 rounded-full mr-3"></div>
				Subscribe to Updates
			</h3>
			<p className="text-white/70 mb-6 font-medium">
				Enter your details to receive exclusive inventory updates and premium offers
			</p>
			<Form {...form}>
				<form
					ref={formRef}
					className="space-y-4"
					action={handleFormAction}
					onSubmit={() => null}
				>
					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="First Name"
											className="glass text-white placeholder:text-white/60 border-white/20 focus:border-brand-navy-400 focus:ring-brand-navy-400/50 backdrop-blur-sm"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="Last Name"
											className="glass text-white placeholder:text-white/60 border-white/20 focus:border-brand-navy-400 focus:ring-brand-navy-400/50 backdrop-blur-sm"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="Email Address"
										type="email"
										className="glass text-white placeholder:text-white/60 border-white/20 focus:border-brand-navy-400 focus:ring-brand-navy-400/50 backdrop-blur-sm w-full"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<SubscribeButton />

					{showMessage && state.success && (
						<div className="flex items-center gap-3 rounded-xl bg-green-500/20 backdrop-blur-sm border border-green-400/30 p-4 text-green-100 animate-in fade-in-0 duration-300">
							<CircleCheckIcon className="h-5 w-5 text-green-400" />
							<span className="font-medium">Success! {state.message}</span>
						</div>
					)}
					{showMessage && !state.success && state.message && (
						<div className="flex items-center gap-3 rounded-xl bg-red-500/20 backdrop-blur-sm border border-red-400/30 p-4 text-red-100 animate-in fade-in-0 duration-300">
							<CircleX className="h-5 w-5 text-red-400" />
							<span className="font-medium">Error! {state.message}</span>
						</div>
					)}
				</form>
			</Form>
		</div>
	);
};
