import { cn } from "@/lib/utils";
import type { ChangeEvent, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	value: string;
	options: { label: string; value: string }[];
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	className?: string;
	selectClassName?: string;
	noDefault?: boolean;
}

export const Select = (props: SelectProps) => {
	const {
		label,
		value,
		options,
		onChange,
		className,
		selectClassName,
		noDefault = true,
		...rest
	} = props;

	return (
		<div className={cn("space-y-2", className)}>
			{label && (
				<h4 className="text-sm font-bold text-white drop-shadow-sm">
					{label}
				</h4>
			)}
			<div className="relative">
				<select
					onChange={onChange}
					value={value ?? ""}
					className={cn(
						selectClassName,
						"glass w-full px-4 py-3 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy-400 focus:border-brand-navy-400 custom-select appearance-none pr-12 bg-no-repeat text-brand-navy-900 font-bold placeholder:text-brand-navy-600 backdrop-blur-sm transition-all duration-300 hover:border-white/50",
					)}
					{...rest}
				>
					{noDefault && (
						<option value="" className="text-brand-navy-700 font-semibold">
							Select {label}
						</option>
					)}
					{options.map((option) => (
						<option 
							key={option.value} 
							value={option.value}
							className="text-brand-navy-900 font-semibold bg-white"
						>
							{option.label}
						</option>
					))}
				</select>
				{/* Custom dropdown arrow */}
				<div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
					<svg className="w-5 h-5 text-brand-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
					</svg>
				</div>
			</div>
		</div>
	);
};
