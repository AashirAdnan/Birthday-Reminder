import React from "react";

const SingleBirthday = ({
  id,
  name,
  age,
  image,
  birthdayLabel,
  nextBirthdayLabel,
  daysUntil,
  onRemove,
}) => {
  const countdownText =
    daysUntil === 0
      ? "Birthday is today"
      : daysUntil === 1
        ? "1 day to go"
        : `${daysUntil} days to go`;

  return (
    <article className="flex items-center justify-between gap-4 rounded-3xl border border-orange-100 bg-white px-4 py-4 shadow-sm shadow-orange-100/50">
      <div className="flex items-center gap-4">
        <div>
          <img className="h-20 w-20 rounded-full object-cover" src={image} alt={name} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-slate-900">{name}</h2>
          <p className="text-sm text-slate-500">{age} years old</p>
          <p className="text-sm font-medium text-orange-600">{countdownText}</p>
          <p className="text-xs text-slate-500">
            Born on {birthdayLabel} - Next birthday: {nextBirthdayLabel}
          </p>
        </div>
      </div>

      <div>
        <button
          onClick={() => onRemove(id)}
          className="rounded-2xl bg-rose-500 px-4 py-3 font-semibold text-white transition hover:bg-rose-600"
        >
          Remove
        </button>
      </div>
    </article>
  );
};

export default SingleBirthday;
