export default function Contact() {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
            <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-2">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full p-2 border rounded"
                        placeholder="Your name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-2 border rounded"
                        placeholder="Your email"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block mb-2">Message</label>
                    <textarea
                        id="message"
                        className="w-full p-2 border rounded"
                        rows={5}
                        placeholder="Your message"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
}
