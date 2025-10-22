import type { AfterChangeHook } from 'payload/dist/collections/config/types'
import type { Order } from '../../../payload-types'
import { docHasTimestamps } from 'payload/types'

export const sendEmail: AfterChangeHook<Order> = async ({ doc, req, operation }) => {
  const { id, customerEmail, customerName, items, total } = doc

  if (operation === 'create') {
    const itemRowsPromises =
      items?.map(async item => {
        const product = typeof item.product === 'string' ? item.product : item.product.title

        return `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">${product}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${
            item.quantity
          }</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${
            item.price
          } LBP</td>  
          <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${(
            item.price * item.quantity
          ).toFixed(2)} LBP</td>
        </tr>
      `
      }) || []

    const itemRows = await Promise.all(itemRowsPromises)
    const itemRowsHtml = itemRows.join('')

    req.payload.sendEmail({
      to: customerEmail,
      from: 'i-muhammadabbas@two.cx',
      subject: 'Thank You for Your Order!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Inter, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
              color: #333333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #211709;
              color: white;
              text-align: center;
              padding: 10px 0;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            }
            .content {
              padding: 20px;
            }
            .footer {
              text-align: center;
              padding: 10px 0;
              font-size: 12px;
              color: #666666;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th, td {
              padding: 12px;
              border: 1px solid #ddd;
            }
            th {
              background-color: #f8f8f8;
            }
            @media screen and (max-width: 600px) {
              table, thead, tbody, th, td, tr {
                display: block;
              }
              th {
                display: none;
              }
              td {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 12px;
                border: none;
                border-bottom: 1px solid #ddd;
              }
              td::before {
                content: attr(data-label);
                font-weight: bold;
                flex-basis: 50%;
                text-align: left;
                padding-right: 10px;
                box-sizing: border-box;
              }
              td:last-child {
                text-align: right;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Your Order!</h1>
            </div>
            <div class="content">
              <p>Dear ${customerName},</p>
              <p>Thank you for your order! We are excited to let you know that your order has been successfully processed. Here is a summary of your order:</p>
              <p><strong>Order ID:</strong> ${id}</p>
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Sub Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemRowsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" style="text-align: right; font-weight: bold;">Total:</td>
                    <td style="text-align: right; font-weight: bold;">${total} LBP</td>
                  </tr>
                </tfoot>
              </table>
              <p>If you have any questions or need further assistance, please do not hesitate to contact us.</p>
              <p>Best regards,</p>
              <p>The Senso Coffee Team</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Senso Coffee. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })
  }
  return
}
