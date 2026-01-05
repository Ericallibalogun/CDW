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
			className="w-full uppercase font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
		<div className="space-y-4">
			<h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
				<div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full mr-3"></div>
				Subscribe to our inventory updates
			</h3>
			<p className="text-gray-600 mb-4 font-semibold">
				Enter your details to receive new stock updates
			</p>
			<Form {...form}>
				<form
					ref={formRef}
					className="space-y-3"
					action={handleFormAction}
					onSubmit={() => null}
				>
					<div className="grid grid-cols-2 gap-3">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="First Name"
											className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
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
											className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
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
										placeholder="Email"
										type="email"
										className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500 w-full"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<SubscribeButton />

					{showMessage && state.success && (
						<div className="flex items-center gap-2 rounded-lg bg-green-600 p-3 text-white animate-in fade-in-0 duration-300">
							<CircleCheckIcon className="h-5 w-5" />
							<span>Success! {state.message}</span>
						</div>
					)}
					{showMessage && !state.success && state.message && (
						<div className="flex items-center gap-2 rounded-lg bg-red-600 p-3 text-white animate-in fade-in-0 duration-300">
							<CircleX className="h-5 w-5" />
							<span>Error! {state.message}</span>
						</div>
					)}
				</form>
			</Form>
		</div>
	);
};
