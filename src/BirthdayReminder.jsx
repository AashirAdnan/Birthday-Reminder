import React, { useEffect, useState } from "react";
import SingleBirthday from "./SingleBirthday";
import { bdays } from "./bdays";

const STORAGE_KEY = "birthday-tracker-people";
const DEFAULT_BIRTHDAY_IMAGE =
  "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";

const getNextBirthdayDetails = (birthday) => {
  const today = new Date();
  const [year, month, day] = birthday.split("-").map(Number);
  let nextBirthday = new Date(today.getFullYear(), month - 1, day);

  if (nextBirthday < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
    nextBirthday = new Date(today.getFullYear() + 1, month - 1, day);
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const todayAtMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const nextAtMidnight = new Date(
    nextBirthday.getFullYear(),
    nextBirthday.getMonth(),
    nextBirthday.getDate()
  );
  const daysUntil = Math.round((nextAtMidnight - todayAtMidnight) / msPerDay);

  return {
    daysUntil,
    nextBirthdayLabel: nextBirthday.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
    birthdayLabel: new Date(year, month - 1, day).toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
    }),
  };
};

const BirthdayReminder = () => {
  const [people, setPeople] = useState(() => {
    const savedPeople = localStorage.getItem(STORAGE_KEY);

    if (!savedPeople) {
      return bdays;
    }

    try {
      const parsedPeople = JSON.parse(savedPeople);
      return Array.isArray(parsedPeople) ? parsedPeople : bdays;
    } catch {
      return bdays;
    }
  });
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    birthday: "",
    image: "",
  });

  const sortedPeople = [...people].sort(
    (firstPerson, secondPerson) =>
      getNextBirthdayDetails(firstPerson.birthday).daysUntil -
      getNextBirthdayDetails(secondPerson.birthday).daysUntil
  );

  const visiblePeople = sortedPeople.slice(0, show ? sortedPeople.length : 5);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
  }, [people]);

  const handleRemove = (id) => {
    setPeople((currentPeople) => currentPeople.filter((person) => person.id !== id));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
  };

  const handleAddPerson = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.age || !formData.birthday) {
      return;
    }

    const nextId =
      people.length > 0 ? Math.max(...people.map((person) => person.id)) + 1 : 1;

    setPeople((currentPeople) => [
      ...currentPeople,
      {
        id: nextId,
        name: formData.name.trim(),
        age: Number(formData.age),
        birthday: formData.birthday,
        image:
          formData.image.trim() || DEFAULT_BIRTHDAY_IMAGE,
      },
    ]);
    setFormData({
      name: "",
      age: "",
      birthday: "",
      image: "",
    });
  };

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ed_0%,_#fde68a_35%,_#f97316_100%)] px-4 py-10">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-[32px] border border-white/50 bg-white/85 p-6 shadow-2xl shadow-orange-900/20 backdrop-blur">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-600">
            Upcoming Birthdays
          </p>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            Birthday Tracker
          </h1>
          <p className="mx-auto max-w-lg text-sm text-slate-600 sm:text-base">
            Keep an eye on the people you want to celebrate this season.
          </p>
          <div className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
            {people.length} {people.length === 1 ? "person" : "people"} on the list
          </div>
        </div>

        <form
          onSubmit={handleAddPerson}
          className="grid gap-3 rounded-3xl border border-orange-100 bg-orange-50/80 p-4 sm:grid-cols-2"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full name"
            className="rounded-2xl border border-orange-200 bg-white px-4 py-3 outline-none transition focus:border-orange-400"
            required
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            min="1"
            className="rounded-2xl border border-orange-200 bg-white px-4 py-3 outline-none transition focus:border-orange-400"
            required
          />
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="rounded-2xl border border-orange-200 bg-white px-4 py-3 outline-none transition focus:border-orange-400"
            required
          />
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Photo URL (optional)"
            className="rounded-2xl border border-orange-200 bg-white px-4 py-3 outline-none transition focus:border-orange-400"
          />
          <button
            type="submit"
            className="sm:col-span-2 rounded-2xl bg-orange-500 px-4 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Add Birthday
          </button>
        </form>

        <div className="space-y-4">
          {people.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-orange-200 bg-orange-50 px-6 py-10 text-center text-slate-600">
              All birthdays cleared. Refresh the list data to start again.
            </div>
          ) : (
            visiblePeople.map((item) => (
              <SingleBirthday
                {...item}
                key={item.id}
                {...getNextBirthdayDetails(item.birthday)}
                onRemove={handleRemove}
              />
            ))
          )}
        </div>

        {people.length > 5 && (
          <button
            onClick={() => setShow(!show)}
            className="rounded-2xl border border-orange-200 bg-orange-100 px-4 py-3 font-semibold text-orange-700 transition hover:bg-orange-200"
          >
            {show ? "Show Fewer Birthdays" : "Show All Birthdays"}
          </button>
        )}
      </div>
    </section>
  );
};

export default BirthdayReminder;
