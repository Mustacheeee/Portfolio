import openai

openai.api_key = "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"

def get_career_advice(skill: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{
            "role": "system",
            "content": "You are a career advisor. Provide concise, actionable advice."
        }, {
            "role": "user",
            "content": f"How can I improve my {skill} skills?"
        }]
    )
    return response.choices[0].message.content

if __name__ == "__main__":
    skill = input("Enter a skill: ")
    advice = get_career_advice(skill)
    print(advice)