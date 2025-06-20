// Dashboard script to handle form submission and data upload

function formSubmit(event) {
      event.preventDefault();
      const form = event.target;

      const data = {
        time: form.time.value,
        cpu: form.cpu.value,
        memory: form.memory.value,
        disk: form.disk.value,
        image: form.image.value || "", // Optional
      };

      fetch("http://localhost:3000/upload", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        if (response.ok) {
          document.getElementById("responseMsg").textContent = "✅ Successfully added!";
          form.reset();
          fetchData(); // Refresh table
        } else {
          document.getElementById("responseMsg").textContent = "❌ Failed to add data.";
        }
      })
      .catch(err => {
        console.error(err);
        document.getElementById("responseMsg").textContent = "⚠️ Error occurred.";
      });
    }

   

//  Fetch  data  from  server at index.html
 function fetchData() {
      fetch("http://localhost:3000/upload")
        .then(res => res.json())
        .then(data => {
          const tableBody = document.getElementById("data-table");
          tableBody.innerHTML = "";

          data.forEach(entry => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td style="padding: 8px; border-bottom: 1px solid #333;">${entry.time}</td>
              <td style="padding: 8px; border-bottom: 1px solid #333;">${entry.cpu}</td>
              <td style="padding: 8px; border-bottom: 1px solid #333;">${entry.memory}</td>
              <td style="padding: 8px; border-bottom: 1px solid #333;">${entry.disk}</td>
              <td style="padding: 8px; border-bottom: 1px solid #333;">
                ${entry.image ? `<img src="${entry.image}" alt="img" width="80" style="border-radius: 6px;">` : "N/A"}
              </td>
            `;
            tableBody.appendChild(row);
          });
        })
        .catch(err => {
          console.error("Fetch error:", err);
        });
    }

    window.addEventListener("DOMContentLoaded", fetchData);
