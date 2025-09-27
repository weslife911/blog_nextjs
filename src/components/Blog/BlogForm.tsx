import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MdE } from "@uiw/react-md-editor"

export default function BlogForm() {
    return (
        <form
        className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-8 xl:py-8 2xl:p-8 space-y-6"
      >
        <div>
          <Label
            htmlFor="blog-title"
            className="mb-3 block text-base font-bold text-black dark:text-white"
          >
            Blog Title
          </Label>
          <Input
            type="text"
            id="blog-title"
            name="blog-title"
            placeholder="Enter the title here..."
            className="w-full text-xl sm:text-2xl font-medium rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-3 px-4 text-black dark:text-white outline-none focus:border-primary focus:shadow-md transition duration-300"
          />
        </div>
        <div className="border-b border-body-color border-opacity-10 pb-6 dark:border-white dark:border-opacity-10">
          <Label
            htmlFor="blog-content"
            className="mb-3 block text-base font-bold text-black dark:text-white"
          >
            Blog Content
          </Label>
          <Textarea
            id="blog-content"
            name="blog-content"
            rows={10}
            placeholder="Write your blog content here..."
            className="w-full resize-none rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-3 px-4 text-base font-medium text-white outline-none focus:border-primary focus:shadow-md transition duration-300"
            defaultValue={""}
          />
        </div>
        <div className="pt-2">
          <Label
            htmlFor="blog-image"
            className="mb-3 block text-base font-bold text-black dark:text-white"
          >
            Featured Image URL
          </Label>
          <Input
            type="file"
            id="blog-image"
            name="blog-image"
            placeholder="e.g., /images/blog/my-new-post.jpg"
            className="w-full rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-3 px-4 text-base text-black dark:text-white outline-none focus:border-primary focus:shadow-md transition duration-300"
          />
        </div>
        <div className="pt-4">
          <div>
            <Label
              htmlFor="blog-tags"
              className="mb-3 block text-sm font-medium text-dark dark:text-white"
            >
              Tags (comma-separated, first tag is featured)
            </Label>
            <Input
              type="text"
              id="blog-tags"
              name="blog-tags"
              placeholder="e.g., creative, design, coding"
              className="w-full rounded-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-2 px-4 text-xs outline-none focus:border-primary focus:shadow-md transition duration-300 text-white"
            />
          </div>
        </div>
        <div className="pt-8">
          <Button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-sm px-6 py-3 text-base font-semibold text-white bg-primary duration-300 hover:bg-opacity-90 shadow-md"
          >
            Publish Blog Post
          </Button>
        </div>
      </form>
    );
}
