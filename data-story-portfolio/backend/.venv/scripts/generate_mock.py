# Generate mock skill data:
import json
from faker import Faker

fake = Faker()

def generate_skills():
    return [{
        "name": fake.random_element(["React", "TensorFlow", "PyTorch"]),
        "proficiency": fake.random.uniform(0.3, 0.95),
        "projects": [fake.uuid4() for _ in range(3)]
    } for _ in range(10)]

if __name__ == "__main__":
    skills = generate_skills()
    with open('../frontend/public/mock_skills.json', 'w') as f:
        json.dump(skills, f, indent=2)
    print("Mock data generated successfully! YAY!")