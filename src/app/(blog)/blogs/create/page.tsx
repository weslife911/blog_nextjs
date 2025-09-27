import BlogForm from "@/components/Blog/BlogForm";

export default function CreateBlog() {
    return (
        <>
            <section id="add-blog" className="py-16 md:py-20 lg:py-28">
  <div className="container mx-auto px-4">
    <div className="max-w-[510px] mx-auto text-center mb-12 lg:mb-20">
      <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-[40px]">
        Create New Blog Content
      </h2>
      <p className="text-base leading-relaxed text-body-color mt-4">
        Enter the core details for your new blog article below.
      </p>
    </div>
    <div className="max-w-4xl mx-auto rounded-sm bg-white shadow-one hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark duration-300">
      <BlogForm/>
    </div>
  </div>
</section>
        </>
    );
}
