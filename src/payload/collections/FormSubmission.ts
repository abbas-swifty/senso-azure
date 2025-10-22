import { CollectionConfig } from "payload/types";

const FormSubmission: CollectionConfig = {
    slug: "form-submission",
    labels: {
        singular: 'Newsletter Submission',
        plural: "Newsletter Submissions",
      },
    fields: [
        {
            type: "text",
            name: "from",
            label: "From Email",
            admin: {
                readOnly: true,
            }
        },
    ]
}

export default FormSubmission;