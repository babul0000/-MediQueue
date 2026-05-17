'use client'

const AddTutorForm = () => {

    const handleSubmit = async(e) => {
        e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const tutor = Object.fromEntries(formData.entries())
    console.log(tutor);

        const res = await fetch(`http://localhost:5000/add-tutor`, {

        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(tutor)
    })

    const data = await res.json()
    console.log(data);
    


    };

    return (
        <div className="w-7/12 mx-auto my-10 p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Tutor Name */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-sm">Tutor Name</label>
                    <input
                        type="text"
                        name="tutorName"
                        placeholder="Rahim Ahmed"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400 text-sm"
                        required
                    />
                </div>

                {/* Photo URL */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-sm">Photo URL</label>
                    <input
                        type="url"
                        name="photoUrl"
                        placeholder="imgbb / postimage link"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400 text-sm"
                        required
                    />
                </div>

                {/* Subject / Category */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-sm">Subject / Category</label>
                    <select
                        name="subject"
                        defaultValue=""
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm bg-white"
                        required
                    >
                        <option value="" disabled>Select Subject</option>
                        <option value="English">English</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Physics">Physics</option>
                        <option value="ICT">ICT</option>
                    </select>
                </div>

                {/* Available Days and Time */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-sm">Available Days and Time</label>
                    <input
                        type="text"
                        name="availableDaysTime"
                        placeholder="Sun - Thu 5:00 PM - 8:00 PM"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400 text-sm"
                        required
                    />
                </div>

                {/* Hourly Fee */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-sm">Hourly Fee</label>
                    <input
                        type="number"
                        name="hourlyFee"
                        placeholder="500"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400 text-sm"
                        required
                    />
                </div>

                {/* Total Slot */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-sm">Total Slot</label>
                    <input
                        type="number"
                        name="totalSlot"
                        placeholder="10"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400 text-sm"
                        required
                    />
                </div>

                {/* Session Start Date */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-sm">Session Start Date</label>
                    <input
                        type="date"
                        name="startDate"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm uppercase text-gray-500"
                        required
                    />
                </div>

                {/* Institution */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-sm">Institution</label>
                    <input
                        type="text"
                        name="institution"
                        placeholder="Dhaka University"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400 text-sm"
                        required
                    />
                </div>

                {/* Experience */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-sm">Experience</label>
                    <textarea
                        name="experience"
                        rows="3"
                        placeholder="3 years teaching experience..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400 text-sm resize-none"
                        required
                    ></textarea>
                </div>

                {/* Location (Area/City) */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-sm">Location (Area/City)</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Khulna"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400 text-sm"
                        required
                    />
                </div>

                {/* Teaching Mode */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1.5 text-sm">Teaching Mode</label>
                    <select
                        name="teachingMode"
                        defaultValue=""
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm bg-white"
                        required
                    >
                        <option value="" disabled>Select Mode</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 text-sm"
                    >
                        Submit Tutor
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddTutorForm;